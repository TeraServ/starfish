
package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.exception.InternalStandardError;
import com.teranet.teralearning.model.Question;
import com.teranet.teralearning.model.Quiz;
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
    private QuizService quizService;
    @Autowired
    private QuestionSetService questionSetService;
    @Autowired
    private UserService userService;
    private ValueMapper valueMapper;




    public QuizController(){}
    @PostMapping("/addQuestion")
    public ResponseEntity addAQuestion(@RequestBody questionResponseDTO newQuestion){
        try{
            if(userService.isUserEmailExists(newQuestion.getCreator())){
                log.info("QuizController:addAQuestion Init ...");
                Question question = valueMapper.questionDTOtoQuestion(newQuestion);
                question.setCreator(userService.getByUserEmail(newQuestion.getCreator()));
                question.setModifier(userService.getByUserEmail(newQuestion.getCreator()));
                return questionSetService.createQuestion(question);
            }else {
                return new ResponseEntity(InternalStandardError.USER_NOT_FOUND.getErrorMessage(),InternalStandardError.USER_NOT_FOUND.getHttpStatus());
            }

        }
        catch (Exception ex){
            log.info("QuizController:addAQuestion Exception Occurred");
            ex.printStackTrace();
            throw new RuntimeException();
        }

    }
    @GetMapping("/mockDataPoint")
    public ResponseEntity mockDataPoint(){
        questionResponseDTO DTO = new questionResponseDTO();
        Set<optionResponseDTO> answers = new HashSet<>();
        DTO.setQuizId(11);
        DTO.setExplanation("Explain here");
        DTO.setType("Single Answer");
        DTO.setMaxSelection(1);
        DTO.setQuestionText("Write a question ?");
        DTO.setAnswers(answers);
        DTO.setCreator("Something@mail.com");
        DTO.setTopic(11);
        return new ResponseEntity<>(DTO, HttpStatus.OK);
    }


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

}

