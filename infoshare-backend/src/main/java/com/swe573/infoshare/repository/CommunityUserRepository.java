package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;

@Repository
public interface CommunityUserRepository extends JpaRepository<CommunityUser, CommunityUserId> {

}
