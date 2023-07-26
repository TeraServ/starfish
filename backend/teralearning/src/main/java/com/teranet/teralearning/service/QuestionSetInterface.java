package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Question;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuestionSetInterface {
    ResponseEntity createQuestion(Question question);
    ResponseEntity<List<Question>> getQuestionFromQuiz(long quizId);
    ResponseEntity deleteQuestion(long questionId);
}
