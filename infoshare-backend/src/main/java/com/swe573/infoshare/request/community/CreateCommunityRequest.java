package com.swe573.infoshare.request.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommunityRequest {
    private String name;
    private String description;
    private String imageUrl;
    private Boolean isPrivate;
}
