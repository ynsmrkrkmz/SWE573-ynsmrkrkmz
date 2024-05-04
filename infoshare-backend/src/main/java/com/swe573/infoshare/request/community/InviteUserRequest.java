package com.swe573.infoshare.request.community;

import com.swe573.infoshare.model.UserCommunityRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InviteUserRequest {
    private Long communityId;
    private Long userId;
    private UserCommunityRole userCommunityRole;
}
