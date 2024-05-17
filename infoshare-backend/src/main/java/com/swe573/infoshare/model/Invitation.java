package com.swe573.infoshare.model;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

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
@Table(name = "invitation")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Where(clause = "deleted = false")
public class Invitation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Where(clause = "deleted = false")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    @Where(clause = "deleted = false")
    private Community community;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "user_community_role", columnDefinition = "user_community_role", nullable = false)
    @Type(PostgreSQLEnumType.class)
    private UserCommunityRole userCommunityRole = UserCommunityRole.MEMBER;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "invitation_status", columnDefinition = "invitation_status", nullable = false)
    @Type(PostgreSQLEnumType.class)
    private InvitationStatus invitationStatus = InvitationStatus.PENDING;
}
