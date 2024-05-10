package com.swe573.infoshare.response;

import java.time.OffsetDateTime;

import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.UserCommunityRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityInvitationListResponse {
    private Long id;
    private String username;
    private String userLastname;
    private String userEmail;
    private UserCommunityRole userCommunityRole;
    private InvitationStatus invitationStatus;
    private OffsetDateTime sentAt;
    private String sentByName;
    private String sentByLastname;
}
