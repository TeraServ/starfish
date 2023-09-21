package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
@Slf4j
@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/topic/")
@Validated
public class TopicController{

    @Autowired
    private TopicService topicService;

    public TopicController(TopicService topicService){
        this.topicService = topicService;
    }

    @PostMapping("new")
    public ResponseEntity newTopic(@RequestBody Topic topic ){
        log.info("topic controler: new topic init ...");
        return topicService.createTopic(topic);
    }
    @GetMapping("list")
    public ResponseEntity getTopic(){
        return new ResponseEntity(topicService.getTopics(), HttpStatus.OK);
    }

    @GetMapping("Filteredlist/{subjectId}")
    public ResponseEntity<Topic> getTopicBySubject(@PathVariable long subjectId){
        return topicService.getTopicBySubject(subjectId);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable long id, @RequestBody Topic topicDetails){
        return topicService.updateTopics(id,topicDetails);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Topic> deleteTopic(@PathVariable long id){

        return topicService.deleteTopicById(id);
    }

    @GetMapping("topicBySubject/{id}")
    public ResponseEntity getTopicByStream(@PathVariable long id){
        return topicService.getTopicBySubjectId(id);
    }

}
