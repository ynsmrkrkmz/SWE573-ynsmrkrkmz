package com.swe573.infoshare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swe573.infoshare.exceptions.InvitationAlreadyExistException;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityInvitation;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.model.UserCommunityRole;
import com.swe573.infoshare.repository.CommunityInvitationRepository;
import com.swe573.infoshare.repository.CommunityRepository;
import com.swe573.infoshare.repository.CommunityUserRepository;
import com.swe573.infoshare.repository.UserRepository;
import com.swe573.infoshare.request.community.CreateCommunityRequest;
import com.swe573.infoshare.request.community.InviteUserRequest;

import lombok.RequiredArgsConstructor;

import java.time.*;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityUserRepository communityUserRepository;
    private final CommunityInvitationRepository communityInvitationRepository;
    private final UserRepository userRepository;

    public boolean createCommunity(User authUser, CreateCommunityRequest request) {
        Community community = Community.builder()
                .name(request.getName())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .createdBy(authUser)
                .isPrivate(request.getIsPrivate())
                .build();

        Community createdCommunity = communityRepository.save(community);
        CommunityUserId communityUserId = new CommunityUserId(createdCommunity.getId(), authUser.getId());
        CommunityUser communityUser = CommunityUser
                .builder()
                .id(communityUserId)
                .createdBy(authUser)
                .userCommunityRole(UserCommunityRole.OWNER)
                .build();

        communityUserRepository.save(communityUser);

        return true;
    }

    public Community getCommunityDetailsById(Long communityId) {
        return communityRepository.getReferenceById(communityId);
    }

    public List<CommunityUser> getUserCommunities(User authUser) {
        return communityUserRepository.findAllByUserAndDeleted(authUser, false);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findByDeleted(false);
    }

    public boolean joinCommunity(User user, Long communityId) {

        Community community = communityRepository.getReferenceById(communityId);

        if (community.isPrivate())
            return false;

        CommunityUserId communityUserId = new CommunityUserId(communityId, user.getId());

        Optional<CommunityUser> existingCommunityUser = communityUserRepository.findById(communityUserId);

        if (existingCommunityUser.isEmpty()) {
            CommunityUser communityUser = CommunityUser
                    .builder()
                    .id(communityUserId)
                    .createdBy(user)
                    .userCommunityRole(UserCommunityRole.MEMBER)
                    .build();

            communityUserRepository.save(communityUser);

            return true;
        }

        existingCommunityUser.get().setUserCommunityRole(UserCommunityRole.MEMBER);
        existingCommunityUser.get().setDeleted(false);
        existingCommunityUser.get().setUpdatedBy(user);
        existingCommunityUser.get().setUpdatedAt(OffsetDateTime.now());

        communityUserRepository.save(existingCommunityUser.get());

        return true;

    }

    public boolean inviteUser(User authUser, InviteUserRequest request) {

        Optional<User> invitedUser = userRepository.findByEmail(request.getEmail());

        if (invitedUser.isEmpty())
            return false;

        CommunityUserId communityUserId = new CommunityUserId(request.getCommunityId(), authUser.getId());
        CommunityUser communityUser = communityUserRepository.getReferenceById(communityUserId);

        if (communityUser.getUserCommunityRole() == UserCommunityRole.MEMBER)
            return false;

        Community community = communityRepository.getReferenceById(request.getCommunityId());

        Optional<CommunityInvitation> existingInvitation = communityInvitationRepository
                .findByCommunityAndUserAndInvitationStatus(community, invitedUser.get(), InvitationStatus.PENDING);

        if (!existingInvitation.isEmpty())
            throw new InvitationAlreadyExistException(request.getEmail());

        CommunityInvitation communityInvitation = CommunityInvitation
                .builder()
                .user(invitedUser.get())
                .community(community)
                .createdBy(authUser)
                .userCommunityRole(request.getUserCommunityRole())
                .build();

        communityInvitationRepository.save(communityInvitation);

        return true;
    }

    public boolean cancelInvitation(User authUser, Long invitationId) {

        CommunityInvitation communityInvitation = communityInvitationRepository.getReferenceById(invitationId);

        communityInvitation.setInvitationStatus(InvitationStatus.CANCELLED);
        communityInvitation.setUpdatedBy(authUser);
        communityInvitation.setUpdatedAt(OffsetDateTime.now());

        communityInvitationRepository.save(communityInvitation);

        return true;
    }

    public boolean respondInvitation(User authUser, Long invitationId, InvitationStatus invitationStatus) {

        CommunityInvitation communityInvitation = communityInvitationRepository.getReferenceById(invitationId);

        if (!communityInvitation.getUser().getId().equals(authUser.getId()))
            return false;

        if (!joinCommunity(authUser, communityInvitation.getCommunity().getId()))
            return false;

        communityInvitation.setInvitationStatus(invitationStatus);
        communityInvitation.setUpdatedBy(authUser);
        communityInvitation.setUpdatedAt(OffsetDateTime.now());

        communityInvitationRepository.save(communityInvitation);

        return true;
    }

    public boolean leaveCommunity(User authUser, Long communityId) {

        CommunityUserId communityUserId = new CommunityUserId(communityId, authUser.getId());
        CommunityUser communityUser = communityUserRepository.getReferenceById(communityUserId);
        List<CommunityUser> owners = communityUserRepository
                .findAllByUserCommunityRole(UserCommunityRole.OWNER);

        if (owners.size() == 1)
            return false;

        if (!communityUser.getUser().getId().equals(authUser.getId()))
            return false;

        communityUser.setDeleted(true);
        communityUser.setUpdatedBy(authUser);
        communityUser.setUpdatedAt(OffsetDateTime.now());

        communityUserRepository.save(communityUser);

        return true;
    }
}
