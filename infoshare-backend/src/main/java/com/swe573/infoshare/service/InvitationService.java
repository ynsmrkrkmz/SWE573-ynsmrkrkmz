package com.swe573.infoshare.service;

import java.time.OffsetDateTime;
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
import com.swe573.infoshare.request.community.InviteUserRequest;
import com.swe573.infoshare.response.CommunityInvitationListResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvitationService {
    private final CommunityInvitationRepository communityInvitationRepository;
    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;
    private final CommunityRepository communityRepository;
    private final CommunityService communityService;

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
                .findAllByCommunityAndUserAndInvitationStatus(community, invitedUser.get(), InvitationStatus.PENDING);

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

    public boolean acceptInvitation(User authUser, Long invitationId) {

        CommunityInvitation communityInvitation = communityInvitationRepository.getReferenceById(invitationId);

        if (!communityInvitation.getUser().getId().equals(authUser.getId()))
            return false;

        if (!communityService.joinCommunity(authUser, communityInvitation.getCommunity().getId()))
            return false;

        communityInvitation.setInvitationStatus(InvitationStatus.ACCEPTED);
        communityInvitation.setUpdatedBy(authUser);
        communityInvitation.setUpdatedAt(OffsetDateTime.now());

        communityInvitationRepository.save(communityInvitation);

        return true;
    }

    public boolean rejectInvitation(User authUser, Long invitationId) {

        CommunityInvitation communityInvitation = communityInvitationRepository.getReferenceById(invitationId);

        if (!communityInvitation.getUser().getId().equals(authUser.getId()))
            return false;

        communityInvitation.setInvitationStatus(InvitationStatus.REJECTED);
        communityInvitation.setUpdatedBy(authUser);
        communityInvitation.setUpdatedAt(OffsetDateTime.now());

        communityInvitationRepository.save(communityInvitation);

        return true;
    }

    public List<CommunityInvitationListResponse> getCommunityInvitations(Long communityId) {

        Community community = communityRepository.getReferenceById(communityId);

        List<CommunityInvitation> communityInvitations = communityInvitationRepository.findAllByCommunity(community);

        return communityInvitations.stream().map(ci -> CommunityInvitationListResponse.builder()
                .id(ci.getId())
                .username(ci.getUser().getName())
                .userLastname(ci.getUser().getLastname())
                .userEmail(ci.getUser().getEmail())
                .sentAt(ci.getCreatedAt())
                .sentByName(ci.getCreatedBy().getName())
                .sentByLastname(ci.getCreatedBy().getLastname())
                .userCommunityRole(ci.getUserCommunityRole())
                .invitationStatus(ci.getInvitationStatus())
                .build()).toList();
    }
}
