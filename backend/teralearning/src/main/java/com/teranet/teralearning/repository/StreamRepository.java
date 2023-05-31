package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Stream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamRepository extends JpaRepository<Stream, Long> {
    @Query("select (count(s) > 0) from Stream s where s.streamName = ?1")
    boolean existsByStreamName(String streamName);

}
