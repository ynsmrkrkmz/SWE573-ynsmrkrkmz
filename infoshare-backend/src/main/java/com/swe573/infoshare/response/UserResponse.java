package com.swe573.infoshare.response;

import com.swe573.infoshare.model.Role;
import com.swe573.infoshare.model.UserCommunityRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private Role role;
    private UserCommunityRole userCommunityRole;
}
