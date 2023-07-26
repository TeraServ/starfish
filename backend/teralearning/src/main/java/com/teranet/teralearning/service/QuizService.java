package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Quiz;
import com.teranet.teralearning.repository.QuizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class QuizService implements QuizInterface{
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }
    public ResponseEntity createQuiz(Quiz quiz){
        try{
            log.info("QuizService:createQuiz Init...");
            if(quiz == null){
                quiz.setCreatedDate(getDateOnly());
                quiz.setModifiedDate(getDateOnly());
                return new ResponseEntity("No Body",HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity(quizRepository.save(quiz),HttpStatus.NOT_FOUND);
            }

        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity("Exception Occurred", HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity getQuestionDetailsOfQuiz(long quizId){
        Optional <Quiz> quiz = quizRepository.findById(quizId);
        if(doesQuizExist(quizId) && quiz.isPresent()){
            return new ResponseEntity<>(quiz.get().getQuestions().toString(),HttpStatus.OK);
        }else {
            return new ResponseEntity(0,HttpStatus.NOT_FOUND);
        }
    }
    private LocalDateTime getDateOnly(){
        return LocalDateTime.now();
    }
    private boolean doesQuizExist(long quizId){
        return quizRepository.existsById(quizId);
    }




}
