package com.swe573.infoshare.controller;

import com.swe573.infoshare.handler.ResponseHandler;
import com.swe573.infoshare.request.auth.AuthenticationRequest;
import com.swe573.infoshare.request.auth.RegisterRequest;
import com.swe573.infoshare.response.AuthenticationResponse;
import com.swe573.infoshare.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request){
        boolean response = authService.register(request);

        if(!response)
            return  ResponseHandler.generateResponse("User registeration failed", HttpStatus.BAD_REQUEST, null);
        return ResponseHandler.generateResponse("User registered successfully", HttpStatus.OK, null);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> register(@RequestBody AuthenticationRequest request){
        String token = authService.authenticate(request);

        if(token.isBlank())
            return  ResponseHandler.generateResponse("User login failed", HttpStatus.BAD_REQUEST, null);

        return ResponseHandler.generateResponse("User login successfully", HttpStatus.OK, AuthenticationResponse.builder().token(token).build());
    }
}
