package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityUser;
import com.swe573.infoshare.model.CommunityUserId;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.model.UserCommunityRole;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityUserRepository extends JpaRepository<CommunityUser, CommunityUserId> {
    List<CommunityUser> findAllByUserAndDeleted(User user, boolean deleted);

    List<CommunityUser> findAllByCommunityAndUserCommunityRoleAndDeleted(Community community,
            UserCommunityRole userCommunityRole, boolean deleted);

    long countByCommunityIdAndDeleted(Long communityId, boolean deleted);

    Optional<CommunityUser> findByIdAndDeleted(CommunityUserId id, boolean deleted);
}
