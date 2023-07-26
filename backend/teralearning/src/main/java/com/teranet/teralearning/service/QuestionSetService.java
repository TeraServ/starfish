package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Question;
import com.teranet.teralearning.repository.QuestionSetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class QuestionSetService implements QuestionSetInterface{
    private QuestionSetRepository questionSetRepository;

    public QuestionSetService(QuestionSetRepository questionSetRepository) {
        this.questionSetRepository = questionSetRepository;
    }

    @Override
    public ResponseEntity createQuestion(Question question){
        try {
            if(question != null) {
                log.info("QuestionSetService:createQuestion Init...");
                return new ResponseEntity(questionSetRepository.save(question), HttpStatus.OK);
            }
            else {
                return new ResponseEntity("No Body",HttpStatus.NOT_FOUND);
            }
        }catch (Exception ex){
            log.info("QuestionSetService:createQuestion Exception Occurred");
            ex.printStackTrace();
            return new ResponseEntity<>("Exception Occurred",HttpStatus.BAD_REQUEST);
        }
    }
    @Override
    public ResponseEntity<List<Question>> getQuestionFromQuiz(long quizId){
        return new ResponseEntity<List<Question>>(questionSetRepository.findByQuizId(quizId),HttpStatus.OK);
    }
    @Override
    public ResponseEntity deleteQuestion(long questionId){
        try {
            log.info("QuestionSetService:deleteQuestion Init...");
            Optional<Question> question = questionSetRepository.findById(questionId);
            if(question.isPresent()){
                log.info("QuestionSetService:deleteQuestion Question body found");
                if(question.get().getQuizId() != 0){
                    log.warn("QuestionSetService:delete Warning: Question Question mapped to a quiz");
                    return new ResponseEntity("Cannot delete question",HttpStatus.CONFLICT);
                }else {
                    log.info("QuestionSetService:deleteQuestion Question not mapped to a quiz");
                    permanentDeleteQuestion(questionId);
                    return new ResponseEntity<>("Question deleted",HttpStatus.OK);
                }
            }
            else {
                log.info("QuestionSetService:deleteQuestion Question not found");
                return new ResponseEntity("Quesion not found",HttpStatus.NOT_FOUND);
            }
        }catch (Exception ex){
            log.info("QuestionSetService:deleteQuestion Exception Occurred");
            ex.printStackTrace();
            return new ResponseEntity("Exception Occurred",HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity updateQuestion(Question question){
        try{
            if(doesQuestionExist(question.getId())) {
                log.info("QuestionSetService:createQuestion Init...");
                return new ResponseEntity(questionSetRepository.save(question), HttpStatus.OK);
            }
            else {
                return new ResponseEntity("No Body",HttpStatus.NOT_FOUND);
            }

        }catch (Exception ex){
            log.info("QuestionSetService:updateQuestion Exception Occurred");
            ex.printStackTrace();
            return new ResponseEntity("Exception Occurred",HttpStatus.BAD_REQUEST);
        }
    }
    private boolean doesQuestionExist(Long questionId){
        return questionSetRepository.existsById(questionId);
    }
    private void permanentDeleteQuestion(long id){
    questionSetRepository.deleteById(id);
}
}
