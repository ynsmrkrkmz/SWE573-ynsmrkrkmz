package com.swe573.infoshare.model;

import org.hibernate.annotations.Type;

import io.hypersistence.utils.hibernate.type.basic.PostgreSQLEnumType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Entity
@Table(name = "community_x_user")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CommunityUser extends BaseEntity {
    @EmbeddedId
    private CommunityUserId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_id")
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("community_id")
    @JoinColumn(name = "community_id", insertable = false, updatable = false)
    private Community community;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "user_community_role", columnDefinition = "user_community_role", nullable = false)
    @Type(PostgreSQLEnumType.class)
    private UserCommunityRole userCommunityRole = UserCommunityRole.MEMBER;
}
