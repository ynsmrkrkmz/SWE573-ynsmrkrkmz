package com.swe573.infoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.request.community.CreateCommunityRequest;
import com.swe573.infoshare.response.CommunityDetailsResponse;
import com.swe573.infoshare.response.UserResponse;
import com.swe573.infoshare.service.CommunityService;

import lombok.RequiredArgsConstructor;

import java.util.*;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
@CrossOrigin
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping("/create-community")
    public ResponseEntity<Object> createCommunity(@RequestBody CreateCommunityRequest request) {
        boolean response = communityService.createCommunity(request);

        if (!response)
            return ResponseHandler.generateResponse("Community creation failed", HttpStatus.BAD_REQUEST, null);
        return ResponseHandler.generateResponse("Community created successfully", HttpStatus.OK, null);
    }

    @GetMapping("/{communityId}")
    public ResponseEntity<Object> getCommunityDetailsById(@PathVariable("communityId") Long communityId) {
        Community response = communityService.getCommunityDetailsById(communityId);

        if (response == null)
            return ResponseHandler.generateResponse("Could not get community details", HttpStatus.BAD_REQUEST, null);

        List<UserResponse> users = response.getUsers().stream().map(u -> UserResponse.builder()
                .name(u.getUser().getName())
                .lastname(u.getUser().getLastname())
                .email(u.getUser().getEmail())
                .role(u.getUser().getRole())
                .id(u.getUser().getId())
                .userCommunityRole(u.getUserCommunityRole())
                .build()).toList();

        CommunityDetailsResponse detailsResponse = CommunityDetailsResponse.builder().name(response.getName())
                .description(response.getDescription())
                .imageUrl(response.getImageUrl())
                .isPrivate(response.isPrivate())
                .users(users)
                .build();

        return ResponseHandler.generateResponse("Community details have got successfully", HttpStatus.OK,
                detailsResponse);
    }
}
