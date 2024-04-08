package com.swe573.infoshare.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.swe573.infoshare.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
