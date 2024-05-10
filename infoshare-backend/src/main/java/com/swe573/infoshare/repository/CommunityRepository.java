package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;
import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByDeleted(Boolean deleted);

    List<Community> findByIsPrivateAndDeleted(Boolean isPrivate, Boolean deleted);
}
