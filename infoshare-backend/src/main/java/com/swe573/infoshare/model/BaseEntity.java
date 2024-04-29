package com.swe573.infoshare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.*;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class BaseEntity {
    @ManyToOne
    @JoinColumn(name = "create_user_id", nullable = false)
    private User createUser;
    @Builder.Default
    @Column(name = "create_date", nullable = false)
    private OffsetDateTime createDate = OffsetDateTime.now();
    @ManyToOne
    @JoinColumn(name = "update_user_id")
    private User updateUser;
    @Column(name = "update_date")
    private OffsetDateTime updateDate;
    @Builder.Default
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
}
