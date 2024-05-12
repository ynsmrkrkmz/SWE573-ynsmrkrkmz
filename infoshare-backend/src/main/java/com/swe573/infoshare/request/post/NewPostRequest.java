package com.swe573.infoshare.request.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewPostRequest {
    private String title;
    private String content;
    private Long communityId;
    private Long postTemplateId;
}
