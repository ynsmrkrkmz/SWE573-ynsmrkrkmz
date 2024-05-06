package com.swe573.infoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.request.community.CreateCommunityRequest;
import com.swe573.infoshare.request.community.InviteUserRequest;
import com.swe573.infoshare.response.CommunityDetailsResponse;
import com.swe573.infoshare.response.CommunityListResponse;
import com.swe573.infoshare.response.UserResponse;
import com.swe573.infoshare.service.CommunityService;

import lombok.RequiredArgsConstructor;

import java.util.*;

@RestController
@RequestMapping("/api/v1/communities")
@RequiredArgsConstructor
@CrossOrigin
public class CommunityController {

        private final CommunityService communityService;

        @PostMapping("/create-community")
        public ResponseEntity<Object> createCommunity(@AuthenticationPrincipal User authUser,
                        @RequestBody CreateCommunityRequest request) {
                boolean response = communityService.createCommunity(authUser, request);

                if (!response)
                        return ResponseHandler.generateResponse("Community creation failed", HttpStatus.BAD_REQUEST,
                                        null);
                return ResponseHandler.generateResponse("Community created successfully", HttpStatus.OK, null);
        }

        @GetMapping("/all")
        public ResponseEntity<Object> getAllCommunities() {
                List<Community> response = communityService.getAllCommunities();

                if (response == null)
                        return ResponseHandler.generateResponse("Could not get communities", HttpStatus.BAD_REQUEST,
                                        null);

                List<CommunityListResponse> communities = response.stream().map(c -> CommunityListResponse.builder()
                                .id(c.getId())
                                .name(c.getName())
                                .imageUrl(c.getImageUrl())
                                .memberCount(c.getUsers().size())
                                .build()).toList();
                return ResponseHandler.generateResponse("Communities has been found successfully", HttpStatus.OK,
                                communities);
        }

        @GetMapping("/mine")
        public ResponseEntity<Object> getUserCommunities(@AuthenticationPrincipal User authUser) {
                List<CommunityUser> response = communityService.getUserCommunities(authUser);

                if (response == null)
                        return ResponseHandler.generateResponse("Could not find user communities",
                                        HttpStatus.BAD_REQUEST, null);

                List<CommunityListResponse> communities = response.stream().map(c -> CommunityListResponse.builder()
                                .id(c.getCommunity().getId())
                                .name(c.getCommunity().getName())
                                .imageUrl(c.getCommunity().getImageUrl())
                                .memberCount(c.getCommunity().getUsers().size())
                                .build()).toList();
                return ResponseHandler.generateResponse("Communities has been found successfully", HttpStatus.OK,
                                communities);
        }

        @GetMapping("/{communityId}")
        public ResponseEntity<Object> getCommunityDetailsById(@AuthenticationPrincipal User authUser,
                        @PathVariable("communityId") Long communityId) {
                Community response = communityService.getCommunityDetailsById(communityId);

                if (response == null)
                        return ResponseHandler.generateResponse("Could not get community details",
                                        HttpStatus.BAD_REQUEST, null);

                boolean joined = response.getUsers().stream()
                                .anyMatch(c -> Objects.equals(c.getUser().getId(), authUser.getId()));

                List<UserResponse> users = !response.isPrivate()
                                || joined
                                                ? response.getUsers().stream().map(u -> UserResponse.builder()
                                                                .name(u.getUser().getName())
                                                                .lastname(u.getUser().getLastname())
                                                                .email(u.getUser().getEmail())
                                                                .role(u.getUser().getRole())
                                                                .id(u.getUser().getId())
                                                                .userCommunityRole(u.getUserCommunityRole())
                                                                .build()).toList()
                                                : Collections.emptyList();

                CommunityDetailsResponse detailsResponse = CommunityDetailsResponse.builder().name(response.getName())
                                .description(response.getDescription())
                                .imageUrl(response.getImageUrl())
                                .isPrivate(response.isPrivate())
                                .users(users)
                                .isJoined(joined)
                                .memberCount(response.getUsers().size())
                                .build();

                return ResponseHandler.generateResponse("Community details have been taken successfully", HttpStatus.OK,
                                detailsResponse);
        }

        @PostMapping("/join-community")
        public ResponseEntity<Object> joinCommunity(@AuthenticationPrincipal User authUser,
                        @RequestParam("communityId") Long communityId) {

                boolean response = communityService.joinCommunity(authUser, communityId);

                if (!response)
                        return ResponseHandler.generateResponse("Could not join community", HttpStatus.BAD_REQUEST,
                                        null);

                return ResponseHandler.generateResponse("Joined community successfully", HttpStatus.OK,
                                null);
        }

        @PostMapping("/invite-user")
        public ResponseEntity<Object> inviteUser(@AuthenticationPrincipal User authUser,
                        @RequestBody InviteUserRequest request) {

                boolean response = communityService.inviteUser(authUser, request);

                if (!response)
                        return ResponseHandler.generateResponse("Could not invite the user", HttpStatus.BAD_REQUEST,
                                        null);

                return ResponseHandler.generateResponse("Invitation sent successfully", HttpStatus.OK,
                                null);
        }

        @PutMapping("/cancel-invitation")
        public ResponseEntity<Object> cancelInvitation(@AuthenticationPrincipal User authUser,
                        @RequestParam("invitationId") Long invitationId) {
                boolean response = communityService.cancelInvitation(authUser, invitationId);

                if (!response)
                        return ResponseHandler.generateResponse("Could not cancel invitation", HttpStatus.BAD_REQUEST,
                                        null);

                return ResponseHandler.generateResponse("Invitation cancelled successfully", HttpStatus.OK,
                                null);
        }

        @PutMapping("/respond-invitation")
        public ResponseEntity<Object> respondInvitation(@AuthenticationPrincipal User authUser,
                        @RequestParam("invitationId") Long invitationId,
                        @RequestParam("invitationStatus") InvitationStatus invitationStatus) {
                boolean response = communityService.respondInvitation(authUser, invitationId, invitationStatus);

                if (!response)
                        return ResponseHandler.generateResponse("Could not respond invitation", HttpStatus.BAD_REQUEST,
                                        null);

                return ResponseHandler.generateResponse("Invitation responded successfully", HttpStatus.OK,
                                null);
        }

        @PutMapping("/leave-community")
        public ResponseEntity<Object> leaveCommunity(@AuthenticationPrincipal User authUser,
                        @RequestParam("communityId") Long communityId) {
                boolean response = communityService.leaveCommunity(authUser, communityId);

                if (!response)
                        return ResponseHandler.generateResponse("Could not leave community", HttpStatus.BAD_REQUEST,
                                        null);

                return ResponseHandler.generateResponse("Community was left successfully", HttpStatus.OK,
                                null);
        }

}
