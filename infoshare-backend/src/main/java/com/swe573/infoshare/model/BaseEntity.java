package com.swe573.infoshare.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.experimental.SuperBuilder;

import java.time.*;

@SuperBuilder
@MappedSuperclass
public abstract class BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_user_id", nullable = false)
    private User createUser;
    @Builder.Default
    @Column(name = "create_date", nullable = false)
    private OffsetDateTime createDate = OffsetDateTime.now();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "update_user_id")
    private User updateUser;
    @Column(name = "update_date")
    private OffsetDateTime updateDate;
    @Builder.Default
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
}
