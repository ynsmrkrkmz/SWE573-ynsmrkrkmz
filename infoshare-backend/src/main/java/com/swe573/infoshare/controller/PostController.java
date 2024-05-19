package com.swe573.infoshare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.request.post.NewPostRequest;
import com.swe573.infoshare.request.post.NewTemplateRequest;
import com.swe573.infoshare.response.PostListResponse;
import com.swe573.infoshare.response.PostTemplateResponse;
import com.swe573.infoshare.service.PostService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@CrossOrigin
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Object> submitNewPost(@AuthenticationPrincipal User user,
            @RequestBody NewPostRequest request) {

        postService.submitNewPost(user, request);

        return ResponseHandler.generateResponse("Post is submitted successfully", HttpStatus.OK,
                null);
    }

    @GetMapping(params = { "communityId" })
    public ResponseEntity<Object> getCommunityPosts(@RequestParam("communityId") Long communityId) {

        List<PostListResponse> posts = postService.getAllCommunityPosts(communityId);

        return ResponseHandler.generateResponse("Community posts have been listed successfully", HttpStatus.OK,
                posts);

    }

    @GetMapping
    public ResponseEntity<Object> getCommunityUserPosts(@AuthenticationPrincipal User user) {

        List<PostListResponse> posts = postService.getAllUserPosts(user);

        return ResponseHandler.generateResponse("User Community posts  have been listed successfully", HttpStatus.OK,
                posts);
    }

    @PostMapping("new-template")
    public ResponseEntity<Object> createNewPostTemplate(@AuthenticationPrincipal User user,
            @RequestBody NewTemplateRequest request) {

        postService.createNewPostTemplate(user, request);

        return ResponseHandler.generateResponse("Post template is created successfully", HttpStatus.OK,
                null);
    }

    @GetMapping(path = "templates", params = { "communityId" })
    public ResponseEntity<Object> getCommunityTemplates(@RequestParam("communityId") Long communityId) {

        List<PostTemplateResponse> postTemplates = postService.getAllCommunityTemplates(communityId);

        return ResponseHandler.generateResponse("Community templates have been listed successfully", HttpStatus.OK,
                postTemplates);
    }
}
