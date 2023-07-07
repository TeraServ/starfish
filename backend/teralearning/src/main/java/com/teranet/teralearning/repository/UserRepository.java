package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String username);

    boolean existsByEmail(String email);
    Optional<User> findById(Long aLong);


//    List<User> findByStream(Stream stream);
}
