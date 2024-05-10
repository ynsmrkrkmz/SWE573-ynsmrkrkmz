package com.swe573.infoshare.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDetailsResponse {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPrivate;
    private Boolean isJoined;
    private Integer memberCount;
    private List<UserResponse> users;
}
