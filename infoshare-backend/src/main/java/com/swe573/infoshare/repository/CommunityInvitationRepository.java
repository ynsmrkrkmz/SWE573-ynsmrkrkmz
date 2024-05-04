package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.CommunityInvitation;

@Repository
public interface CommunityInvitationRepository extends JpaRepository<CommunityInvitation, Long> {

}
