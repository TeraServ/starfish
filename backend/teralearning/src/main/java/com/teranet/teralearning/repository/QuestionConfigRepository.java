package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.QuestionConfigs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionConfigRepository extends JpaRepository<QuestionConfigs,Long> {
    boolean existsByQuestionType(String questionType);
    QuestionConfigs findByQuestionType(String questionType);
}
