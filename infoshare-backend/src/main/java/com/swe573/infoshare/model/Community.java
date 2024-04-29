package com.swe573.infoshare.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Entity
@Table(name = "community")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
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

    @Builder.Default
    @OneToMany(mappedBy = "community", targetEntity = CommunityUser.class, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CommunityUser> users = new ArrayList<>();
}
