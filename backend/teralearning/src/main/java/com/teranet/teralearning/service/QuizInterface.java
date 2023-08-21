package com.teranet.teralearning.service;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.model.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuizInterface {
    ResponseEntity createQuiz(QuizDTO quizDTO);

    ResponseEntity updateQuiz(long id, QuizDTO quizDTODetails);
    public List<Quiz> getQuiz();

    ResponseEntity deleteQuizById(long id);
}
