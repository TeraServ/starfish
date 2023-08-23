
package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.exception.InternalStandardError;
import com.teranet.teralearning.model.Question;
import com.teranet.teralearning.model.Quiz;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.repository.StreamRepository;
import com.teranet.teralearning.repository.SubjectRepository;
import com.teranet.teralearning.repository.TopicRepository;
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


    public QuizController(){}
    @PostMapping("/addQuestion")
    public ResponseEntity addAQuestion(@RequestBody questionResponseDTO newQuestion){
        try{
            if(userService.isUserEmailExists(newQuestion.getCreator())){
                log.info("QuizController:addAQuestion Init ...");
                Question question = modelMapperService.questionDTOtoQuestion(newQuestion);
                log.debug("QuizController:addAQuestion Question Body:"+question.toString());
                return questionSetService.createQuestion(question);
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
    @GetMapping("/mockDataPoint")
    public ResponseEntity mockDataPoint(){
        questionResponseDTO DTO = new questionResponseDTO();
        optionResponseDTO optionDTO = new optionResponseDTO(
                11,1,"First Option",true,2,"This is the correct answer",false,false,"primary"
        );
        Set<optionResponseDTO> answers = new HashSet<>();
        answers.add(optionDTO);
        DTO.setQuizId(11);
        DTO.setExplanation("Explain here");
        DTO.setType("Single Answer");
        DTO.setMaxSelection(1);
        DTO.setQuestionText("Write a question ?");
        DTO.setAnswers(answers);
        DTO.setCreator("Something@mail.com");
        DTO.setTopic(11);
        DTO.setModifier("modifier@mail.com");

        return new ResponseEntity<>(DTO, HttpStatus.OK);

    }
    @GetMapping("/createMockTopic")
    public ResponseEntity mockTopicCreation(){
        Topic topic = new Topic();
        topic.setTopicName("Basics");
        long subjectId = 36;
        topic.setSubject(subjectRepository.findById(subjectId).get());
        topic.setCreatedBy("Guido van Rossum");
        topic.setModifiedBy("Hitesh");
        topicRepository.save(topic);
        return new ResponseEntity<>(topic, HttpStatus.OK);
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

