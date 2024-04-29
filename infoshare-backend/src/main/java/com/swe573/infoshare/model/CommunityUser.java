package com.swe573.infoshare.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Entity
@Table(name = "community_x_user")
@NoArgsConstructor
public class CommunityUser {
    @EmbeddedId
    private CommunityUserId id;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @MapsId("community_id")
    @JoinColumn(name = "community_id", insertable = false, updatable = false)
    @JsonBackReference
    private Community community;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "user_community_role", columnDefinition = "user_community_role", nullable = false)
    private UserCommunityRole userCommunityRole = UserCommunityRole.MEMBER;
}
