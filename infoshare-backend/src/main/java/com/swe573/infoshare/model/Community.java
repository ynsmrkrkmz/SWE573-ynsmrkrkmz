package com.swe573.infoshare.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Entity
@Table(name = "community")
@EqualsAndHashCode(callSuper = true)
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, columnDefinition = "text")
    private String description;
    @Column(name = "image_url")
    private String imageUrl;
    @Builder.Default
    @Column(name = "is_private", nullable = false)
    private boolean isPrivate = true;
}
