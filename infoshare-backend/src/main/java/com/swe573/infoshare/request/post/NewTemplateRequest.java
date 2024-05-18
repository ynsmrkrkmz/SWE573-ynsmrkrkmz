package com.swe573.infoshare.request.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewTemplateRequest {
    private String title;
    private String template;
    private Long communityId;
}
