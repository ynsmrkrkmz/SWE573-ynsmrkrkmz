package com.swe573.infoshare.controller;

import java.util.List;

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
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.request.community.InviteUserRequest;
import com.swe573.infoshare.response.CommunityInvitationListResponse;
import com.swe573.infoshare.service.InvitationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/invitations")
@RequiredArgsConstructor
@CrossOrigin
public class InvitationController {
    private final InvitationService invitationService;

    @PostMapping("/invite-user")
    public ResponseEntity<Object> inviteUser(@AuthenticationPrincipal User authUser,
            @RequestBody InviteUserRequest request) {

        boolean response = invitationService.inviteUser(authUser, request);

        if (!response)
            return ResponseHandler.generateResponse("Could not invite the user", HttpStatus.BAD_REQUEST,
                    null);

        return ResponseHandler.generateResponse("Invitation sent successfully", HttpStatus.OK,
                null);
    }

    @GetMapping
    public ResponseEntity<Object> getCommunityInvitations(@AuthenticationPrincipal User authUser,
            @RequestParam("communityId") Long communityId) {

        List<CommunityInvitationListResponse> communityInvitationListResponse = invitationService
                .getCommunityInvitations(communityId);

        return ResponseHandler.generateResponse("Community invitations have been got successfully",
                HttpStatus.OK,
                communityInvitationListResponse);
    }

    @PutMapping("/{invitationId}/cancel-invitation")
    public ResponseEntity<Object> cancelInvitation(@AuthenticationPrincipal User authUser,
            @PathVariable("invitationId") Long invitationId) {
        boolean response = invitationService.cancelInvitation(authUser, invitationId);

        if (!response)
            return ResponseHandler.generateResponse("Could not cancel invitation", HttpStatus.BAD_REQUEST,
                    null);

        return ResponseHandler.generateResponse("Invitation cancelled successfully", HttpStatus.OK,
                null);
    }

    @PutMapping("/{invitationId}/accept-invitation")
    public ResponseEntity<Object> respondInvitation(@AuthenticationPrincipal User authUser,
            @PathVariable("invitationId") Long invitationId) {
        boolean response = invitationService.acceptInvitation(authUser, invitationId);

        if (!response)
            return ResponseHandler.generateResponse("Could not accept invitation", HttpStatus.BAD_REQUEST,
                    null);

        return ResponseHandler.generateResponse("Invitation accepted successfully", HttpStatus.OK,
                null);
    }

    @PutMapping("/{invitationId}/reject-invitation")
    public ResponseEntity<Object> rejectInvitation(@AuthenticationPrincipal User authUser,
            @PathVariable("invitationId") Long invitationId) {
        boolean response = invitationService.rejectInvitation(authUser, invitationId);

        if (!response)
            return ResponseHandler.generateResponse("Could not reject invitation", HttpStatus.BAD_REQUEST,
                    null);

        return ResponseHandler.generateResponse("Invitation rejected successfully", HttpStatus.OK,
                null);
    }
}
