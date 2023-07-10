package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TokenRepository extends JpaRepository<TokenValidity,Long> {
    long deleteByUser(User user);


    TokenValidity findByUser(User user);

    @Override
    TokenValidity getReferenceById(Long aLong);

}
