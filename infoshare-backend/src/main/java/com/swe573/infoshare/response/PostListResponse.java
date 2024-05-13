package com.swe573.infoshare.response;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponse {
    private Long id;
    private String title;
    private String content;
    private Long communityId;
    private String communityName;
    private Long voteCount;
    private Long createdById;
    private String createdByName;
    private OffsetDateTime createdAt;
    private String postTemplate;
}
