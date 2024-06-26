package com.swe573.infoshare.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swe573.infoshare.exceptions.LastOwnerCannotLeaveException;
import com.swe573.infoshare.exceptions.UserAlreadyAMemberException;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.model.UserCommunityRole;
import com.swe573.infoshare.repository.CommunityRepository;
import com.swe573.infoshare.repository.CommunityUserRepository;
import com.swe573.infoshare.request.community.CreateCommunityRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityUserRepository communityUserRepository;

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
        return communityRepository.findByIsPrivateAndDeleted(false, false);
    }

    public boolean joinCommunity(User user, Long communityId, UserCommunityRole userCommunityRole,
            boolean checkPrivate) {

        Community community = communityRepository.getReferenceById(communityId);

        if (checkPrivate && community.getIsPrivate().booleanValue())
            return false;

        CommunityUserId communityUserId = new CommunityUserId(communityId, user.getId());

        Optional<CommunityUser> existingCommunityUser = communityUserRepository.findById(communityUserId);

        if (existingCommunityUser.isEmpty()) {
            CommunityUser communityUser = CommunityUser
                    .builder()
                    .id(communityUserId)
                    .createdBy(user)
                    .userCommunityRole(userCommunityRole)
                    .build();

            communityUserRepository.save(communityUser);

            return true;
        }

        if (!existingCommunityUser.get().getDeleted().booleanValue())
            throw new UserAlreadyAMemberException(user.getEmail());

        existingCommunityUser.get().setUserCommunityRole(userCommunityRole);
        existingCommunityUser.get().setDeleted(false);
        existingCommunityUser.get().setUpdatedBy(user);
        existingCommunityUser.get().setUpdatedAt(OffsetDateTime.now());

        communityUserRepository.save(existingCommunityUser.get());

        return true;

    }

    public boolean leaveCommunity(User authUser, Long communityId) {

        Community community = communityRepository.getReferenceById(communityId);

        CommunityUserId communityUserId = new CommunityUserId(communityId, authUser.getId());
        CommunityUser communityUser = communityUserRepository.getReferenceById(communityUserId);
        List<CommunityUser> owners = communityUserRepository
                .findAllByCommunityAndUserCommunityRoleAndDeleted(community, UserCommunityRole.OWNER, false);

        if (owners.size() == 1)
            throw new LastOwnerCannotLeaveException();

        if (!communityUser.getUser().getId().equals(authUser.getId()))
            return false;

        communityUser.setDeleted(true);
        communityUser.setUpdatedBy(authUser);
        communityUser.setUpdatedAt(OffsetDateTime.now());

        communityUserRepository.save(communityUser);

        return true;
    }

}
