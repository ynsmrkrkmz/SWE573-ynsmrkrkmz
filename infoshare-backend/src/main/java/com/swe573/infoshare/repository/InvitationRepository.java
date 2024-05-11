package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.Invitation;
import com.swe573.infoshare.model.InvitationStatus;
import com.swe573.infoshare.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Optional<Invitation> findAllByCommunityAndUserAndInvitationStatus(Community community, User user,
            InvitationStatus invitationStatus);

    List<Invitation> findAllByCommunity(Community community);

    List<Invitation> findAllByUserAndInvitationStatus(User user, InvitationStatus invitationStatus);
}
