package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("select (count(q) > 0) from Quiz q where q.topic.id = ?1")
    boolean existsByTopic_Id(long Id);
}
