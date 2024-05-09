package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.CommunityInvitation;
import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.User;

import java.util.Optional;

@Repository
public interface CommunityInvitationRepository extends JpaRepository<CommunityInvitation, Long> {
    Optional<CommunityInvitation> findByCommunityAndUserAndInvitationStatus(Community community, User user,
            InvitationStatus invitationStatus);
}
