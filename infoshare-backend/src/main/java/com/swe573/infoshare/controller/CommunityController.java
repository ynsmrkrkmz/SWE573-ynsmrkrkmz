package com.swe573.infoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.request.community.CreateCommunityRequest;
import com.swe573.infoshare.service.CommunityService;

import lombok.RequiredArgsConstructor;

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
}
