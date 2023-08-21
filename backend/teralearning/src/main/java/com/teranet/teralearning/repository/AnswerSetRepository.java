package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AnswerSetRepository extends JpaRepository<Answer, Long> {
}
