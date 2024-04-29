package com.swe573.infoshare.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityListResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private Integer memberCount;
}
