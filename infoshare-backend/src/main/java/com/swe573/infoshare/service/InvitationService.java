package com.swe573.infoshare.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swe573.infoshare.exceptions.InvitationAlreadyExistException;
import com.swe573.infoshare.exceptions.UnauthorizedActionException;
import com.swe573.infoshare.exceptions.UserAlreadyAMemberException;
import com.swe573.infoshare.exceptions.UserNotFoundException;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.Invitation;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.model.UserCommunityRole;
import com.swe573.infoshare.repository.InvitationRepository;
import com.swe573.infoshare.repository.CommunityRepository;
import com.swe573.infoshare.repository.CommunityUserRepository;
import com.swe573.infoshare.repository.UserRepository;
import com.swe573.infoshare.request.community.InviteUserRequest;
import com.swe573.infoshare.response.InvitationListResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;
    private final CommunityRepository communityRepository;
    private final CommunityService communityService;

    public boolean inviteUser(User authUser, InviteUserRequest request) {

        CommunityUserId communityUserId = new CommunityUserId(request.getCommunityId(), authUser.getId());
        CommunityUser communityUser = communityUserRepository.getReferenceById(communityUserId);

        if (communityUser.getUserCommunityRole() == UserCommunityRole.MEMBER)
            throw new UnauthorizedActionException();

        Optional<User> invitedUser = userRepository.findByEmail(request.getEmail());

        if (invitedUser.isEmpty())
            throw new UserNotFoundException(request.getEmail());

        CommunityUserId communityInvitedUserId = new CommunityUserId(request.getCommunityId(),
                invitedUser.get().getId());
        Optional<CommunityUser> communityInvitedUser = communityUserRepository.findByIdAndDeleted(
                communityInvitedUserId,
                false);

        if (communityInvitedUser.isPresent())
            throw new UserAlreadyAMemberException(request.getEmail());

        Community community = communityRepository.getReferenceById(request.getCommunityId());

        Optional<Invitation> existingInvitation = invitationRepository
                .findAllByCommunityAndUserAndInvitationStatus(community, invitedUser.get(), InvitationStatus.PENDING);

        if (!existingInvitation.isEmpty())
            throw new InvitationAlreadyExistException(request.getEmail());

        Invitation invitation = Invitation
                .builder()
                .user(invitedUser.get())
                .community(community)
                .createdBy(authUser)
                .userCommunityRole(request.getUserCommunityRole())
                .build();

        invitationRepository.save(invitation);

        return true;
    }

    public boolean cancelInvitation(User authUser, Long invitationId) {

        Invitation invitation = invitationRepository.getReferenceById(invitationId);

        invitation.setInvitationStatus(InvitationStatus.CANCELLED);
        invitation.setUpdatedBy(authUser);
        invitation.setUpdatedAt(OffsetDateTime.now());

        invitationRepository.save(invitation);

        return true;
    }

    public boolean acceptInvitation(User authUser, Long invitationId) {

        Invitation invitation = invitationRepository.getReferenceById(invitationId);

        if (!invitation.getUser().getId().equals(authUser.getId()))
            return false;

        if (!communityService.joinCommunity(authUser, invitation.getCommunity().getId(),
                invitation.getUserCommunityRole()))
            return false;

        invitation.setInvitationStatus(InvitationStatus.ACCEPTED);
        invitation.setUpdatedBy(authUser);
        invitation.setUpdatedAt(OffsetDateTime.now());

        invitationRepository.save(invitation);

        return true;
    }

    public boolean rejectInvitation(User authUser, Long invitationId) {

        Invitation invitation = invitationRepository.getReferenceById(invitationId);

        if (!invitation.getUser().getId().equals(authUser.getId()))
            return false;

        invitation.setInvitationStatus(InvitationStatus.REJECTED);
        invitation.setUpdatedBy(authUser);
        invitation.setUpdatedAt(OffsetDateTime.now());

        invitationRepository.save(invitation);

        return true;
    }

    public List<InvitationListResponse> getCommunityInvitations(Long communityId) {

        Community community = communityRepository.getReferenceById(communityId);

        List<Invitation> invitations = invitationRepository.findAllByCommunity(community);

        return invitations.stream().map(ci -> InvitationListResponse.builder()
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

    public List<InvitationListResponse> getUserPendingInvitations(User user) {

        List<Invitation> invitations = invitationRepository.findAllByUserAndInvitationStatus(user,
                InvitationStatus.PENDING);

        return invitations.stream().map(ci -> InvitationListResponse.builder()
                .id(ci.getId())
                .sentAt(ci.getCreatedAt())
                .sentByName(ci.getCreatedBy().getName())
                .sentByLastname(ci.getCreatedBy().getLastname())
                .communityName(ci.getCommunity().getName())
                .userCommunityRole(ci.getUserCommunityRole())
                .invitationStatus(ci.getInvitationStatus())
                .build()).toList();
    }
}
