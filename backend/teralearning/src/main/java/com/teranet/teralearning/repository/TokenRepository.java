package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface TokenRepository extends JpaRepository<TokenValidity,Long> {
    TokenValidity findByUser(User user);
    @Query("select t from TokenValidity t where t.user.Id = ?1")
    TokenValidity FindTokenbyUserId(long id);

}
