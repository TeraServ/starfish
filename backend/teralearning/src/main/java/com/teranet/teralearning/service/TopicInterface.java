package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.model.Topic;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TopicInterface {
    ResponseEntity<Topic> createTopic(Topic topic);
    List<Topic> getTopics();

    ResponseEntity<Topic> updateTopics(long id, Topic topicDetails);

    ResponseEntity deleteTopicById(long id);
}
