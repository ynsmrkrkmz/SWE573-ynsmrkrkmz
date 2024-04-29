package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.User;

import java.util.List;

@Repository
public interface CommunityUserRepository extends JpaRepository<CommunityUser, CommunityUserId> {
    List<CommunityUser> findAllByUser(User user);
}
