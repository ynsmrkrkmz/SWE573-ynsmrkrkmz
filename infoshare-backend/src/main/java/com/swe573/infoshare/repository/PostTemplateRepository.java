package com.swe573.infoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.infoshare.model.PostTemplate;

@Repository
public interface PostTemplateRepository extends JpaRepository<PostTemplate, Long> {

}
