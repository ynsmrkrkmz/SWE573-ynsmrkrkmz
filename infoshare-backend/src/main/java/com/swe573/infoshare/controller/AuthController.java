package com.swe573.infoshare.controller;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.request.auth.AuthenticationRequest;
import com.swe573.infoshare.request.auth.RegisterRequest;
import com.swe573.infoshare.response.AuthenticationResponse;
import com.swe573.infoshare.response.UserResponse;
import com.swe573.infoshare.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    @PostMapping("/auth/sign-up")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        boolean response = authService.register(request);

        if (!response)
            return ResponseHandler.generateResponse("User registeration failed", HttpStatus.BAD_REQUEST, null);
        return ResponseHandler.generateResponse("User registered successfully", HttpStatus.OK, null);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody AuthenticationRequest request) {
        String token = authService.authenticate(request);

        if (token.isBlank())
            return ResponseHandler.generateResponse("User login failed", HttpStatus.BAD_REQUEST, null);

        return ResponseHandler.generateResponse("User login successfully", HttpStatus.OK,
                AuthenticationResponse.builder().token(token).build());
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<Object> getUserDetails(@AuthenticationPrincipal User authUser,
            @PathVariable("userId") Long userId) {
        User user = authService.getUserDetails(userId);

        if (user == null)
            return ResponseHandler.generateResponse("Could not find user", HttpStatus.BAD_REQUEST, null);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .build();

        return ResponseHandler.generateResponse("User found successfully", HttpStatus.OK,
                userResponse);
    }

    @GetMapping("/users/me")
    public ResponseEntity<Object> getAuthUserDetails(@AuthenticationPrincipal User authUser) {
        User user = authService.getUserDetails(authUser.getId());

        if (user == null)
            return ResponseHandler.generateResponse("Could not find user", HttpStatus.BAD_REQUEST, null);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .lastname(user.getLastname())
                .build();

        return ResponseHandler.generateResponse("User found successfully", HttpStatus.OK, userResponse);
    }

}
