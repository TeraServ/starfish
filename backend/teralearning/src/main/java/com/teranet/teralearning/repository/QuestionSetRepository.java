package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionSetRepository extends JpaRepository<Question ,Long> {
    List<Question> findByQuizId(long quizId);

}
