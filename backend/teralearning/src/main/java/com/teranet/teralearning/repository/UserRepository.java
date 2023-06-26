package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String username);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);
    Optional<User> findById(Long aLong);

}
