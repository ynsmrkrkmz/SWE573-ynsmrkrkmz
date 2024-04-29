package com.swe573.infoshare.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
                .createUser(authUser)
                .isPrivate(request.isPrivate())
                .build();

        Community createdCommunity = communityRepository.save(community);
        CommunityUserId communityUserId = new CommunityUserId(createdCommunity.getId(), authUser.getId());
        CommunityUser communityUser = CommunityUser
                .builder()
                .id(communityUserId)
                .userCommunityRole(UserCommunityRole.OWNER)
                .build();

        communityUserRepository.save(communityUser);

        return true;
    }

    public Community getCommunityDetailsById(Long communityId) {
        return communityRepository.getReferenceById(communityId);
    }

    public List<CommunityUser> getUserCommunities(User authUser) {
        return communityUserRepository.findAllByUser(authUser);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }
}
