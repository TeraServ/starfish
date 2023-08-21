package com.teranet.teralearning.service;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.model.Quiz;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.repository.QuizRepository;
import com.teranet.teralearning.repository.TopicRepository;
import com.teranet.teralearning.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@NoArgsConstructor
public class QuizService implements QuizInterface{
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserRepository userRepository;


    public QuizService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;

    }
    @Override
    public ResponseEntity createQuiz(QuizDTO quizDTO){
        try{
            log.info("QuizService:createQuiz Init...");
            if(quizDTO == null){
                return new ResponseEntity("No Body",HttpStatus.NOT_FOUND);
            }else {
                Quiz quiz = new Quiz();

                quiz.setQuizName(quizDTO.getQuizName());
                quiz.setTopic(quizDTO.getTopic());
                quiz.setCreator(quizDTO.getCreator());
                quiz.setModifier(quizDTO.getModifier());
                quiz.setPassCriteria(quizDTO.getPassCriteria());
                quiz.setAllowRetake(quizDTO.isAllowRetake());
                quiz.setCreatedDate(getDateOnly());
                quiz.setModifiedDate(getDateOnly());
                return new ResponseEntity(quizRepository.save(quiz),HttpStatus.OK);
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

    @Override
    public List<Quiz> getQuiz() {


        return quizRepository.findAll();
    }
    private LocalDateTime getDateOnly(){
        return LocalDateTime.now();
    }
    private boolean doesQuizExist(long quizId){
        return quizRepository.existsById(quizId);
    }

    @Override
    public ResponseEntity updateQuiz(long id, QuizDTO quizDTODetails){
        Quiz updateQuiz = quizRepository.getReferenceById(id);
        if(quizRepository.existsById(id)){
            log.info("Before  Update:"+updateQuiz.toString());
            updateQuiz.setQuizName((quizDTODetails.getQuizName()));
            updateQuiz.setTopic((quizDTODetails.getTopic()));
            updateQuiz.setModifier((quizDTODetails.getModifier()));
            updateQuiz.setPassCriteria((quizDTODetails.getPassCriteria()));
            updateQuiz.setAllowRetake((quizDTODetails.isAllowRetake()));
            updateQuiz.setModifiedDate(getDateOnly());
            log.info("After Update:"+updateQuiz.toString());
            return new ResponseEntity<>(quizRepository.save(updateQuiz),HttpStatus.OK);
        }
        else {
            return null;
        }

    }

    public ResponseEntity deleteQuizById(long id){
        if(quizRepository.existsById(id)){
            quizRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return null;
        }
    }

//    public ResponseEntity mockData(){
//        Quiz quiz =  new Quiz();
//        quiz.setQuizName("CSQuiz");
//        quiz.setAllowRetake(true);
//        quiz.setCreatedDate(getDateOnly());
//        quiz.setModifiedDate(getDateOnly());
//        quiz.setPassCriteria(6);
//        long userID = 121;
//        long topicID = 67;
//        quiz.setCreator(userRepository.findById(userID).get());
//        quiz.setModifier(userRepository.findById(userID).get());
//        quiz.setTopic(topicRepository.findById(topicID).get());
//
//        return new ResponseEntity(quizRepository.save(quiz),HttpStatus.OK);
//
//    }


}
