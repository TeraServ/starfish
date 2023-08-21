package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.model.Quiz;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/quiz/")
@Validated
public class QuizController {

    private QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
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
