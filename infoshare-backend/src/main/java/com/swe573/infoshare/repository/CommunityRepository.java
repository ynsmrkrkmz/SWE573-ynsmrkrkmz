package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {

}
