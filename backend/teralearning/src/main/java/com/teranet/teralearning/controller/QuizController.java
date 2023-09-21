
package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.exception.InternalStandardError;
import com.teranet.teralearning.model.*;
import com.teranet.teralearning.repository.*;
import com.teranet.teralearning.service.ModelMapperService;
import com.teranet.teralearning.service.QuestionSetService;
import com.teranet.teralearning.service.QuizService;
import com.teranet.teralearning.service.UserService;
import com.teranet.teralearning.util.ValueMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/quiz/")
@Validated
@Slf4j
public class QuizController {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private QuizService quizService;
    @Autowired
    private QuestionSetService questionSetService;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapperService modelMapperService;
    @Autowired
    private StreamRepository streamRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    private ValueMapper valueMapper;
    public QuizController(){}

    @PostMapping("new")
    public ResponseEntity newQuiz(@RequestBody QuizDTO quizDTO ){
        return quizService.createQuiz(quizDTO);
    }

    @GetMapping("list")
    public ResponseEntity getQuiz(){
        return new ResponseEntity(quizService.getQuiz(), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable long id, @RequestBody QuizDTO quizDTODetails){
        return quizService.updateQuiz(id,quizDTODetails);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Quiz> deleteQuiz(@PathVariable long id){

        return quizService.deleteQuizById(id);
    }



    @GetMapping("/createMockQuestion")
    public ResponseEntity mockQuestionCreation(){
        Question newquestion = new Question();
        long id = 552;
        newquestion.setQuiz(quizRepository.findById(id).get());
        newquestion.setQuestionType("singleAnswer");
        newquestion.setQuestionText("What is an array?");
        Answer newAnswer = new Answer();
        newAnswer.setAnswer("Array is a collection for storing simikar data type");
        newAnswer.setCorrect(true);
        newAnswer.setDisabled(false);
        newAnswer.setOptionId(1);
        newAnswer.setValue(2);
        newAnswer.setOwnerEmail("lavanya@mail.com");
        Set<Answer> answers = new HashSet<>();
        answers.add(newAnswer);
        newquestion.setAnswers(answers);
        newquestion.setCreator(121);
        newquestion.setModifier(121);
        newquestion.setMaximumSelectionAllowed(1);
        newquestion.setExplanation("This is correct from theory.");
        return new ResponseEntity<>(questionSetService.createQuestion(newquestion), HttpStatus.OK);
    }

    @PostMapping("/addQuestion")
    public ResponseEntity addAQuestion(@RequestBody Question newQuestion){
        try{
            if(userService.findById(newQuestion.getCreator()).get()!=null){
                log.info("QuizController:addAQuestion Init ...");

                log.debug("QuizController:addAQuestion Question Body:");
                return questionSetService.createQuestion(newQuestion);
            }else {
                return new ResponseEntity(InternalStandardError.USER_NOT_FOUND.getErrorMessage(),InternalStandardError.USER_NOT_FOUND.getHttpStatus());
            }

        }
        catch (Exception ex){
            log.error("QuizController:addAQuestion Exception Occurred");
            ex.printStackTrace();
            throw new RuntimeException();
        }

    }

    @PutMapping("updateQuestion/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable long id, @RequestBody Question questionDetails){
        return questionSetService.updateQuestion(id,questionDetails);
    }

    @GetMapping("questionList/{id}")
    public ResponseEntity getQuestionFromQuiz(@PathVariable long id){
        return new ResponseEntity(questionSetService.getQuestionFromQuiz(id), HttpStatus.OK);
    }

    @DeleteMapping("deleteQuestion/{id}")
    public ResponseEntity<Question> deleteQuestion(@PathVariable long id){

        return questionSetService.deleteQuestion(id);
    }
}

