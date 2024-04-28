package com.swe573.infoshare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CommunityUserId implements Serializable {
    @Column(name = "community_id")
    private Long communityId;
    @Column(name = "user_id")
    private Long userId;
}
