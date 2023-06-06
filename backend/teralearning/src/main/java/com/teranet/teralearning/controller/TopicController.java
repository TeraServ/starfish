package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.service.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topic/")
@Validated
public class TopicController{

    private TopicService topicService;

    public TopicController(TopicService topicService){
        this.topicService = topicService;
    }

    @PostMapping("new")
    public ResponseEntity newTopic(@RequestBody Topic topic ){
        return topicService.createTopic(topic);
    }
    @GetMapping("list")
    public ResponseEntity getTopic(){
        return new ResponseEntity(topicService.getTopics(), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable long id, @RequestBody Topic topicDetails){
        return topicService.updateTopics(id,topicDetails);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Topic> deleteTopic(@PathVariable long id){

        return topicService.deleteTopicById(id);
    }

}
