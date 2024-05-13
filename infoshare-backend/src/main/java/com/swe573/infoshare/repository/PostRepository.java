package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.Post;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCommunityAndDeletedOrderByCreatedAtDesc(Community community, boolean deleted);

    List<Post> findAllByCommunityInAndDeletedOrderByCreatedAtDesc(List<Community> communities, boolean deleted);
}