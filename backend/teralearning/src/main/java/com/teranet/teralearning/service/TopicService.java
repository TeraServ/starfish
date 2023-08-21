package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.repository.TopicRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService implements TopicInterface{

    private TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository){
        this.topicRepository = topicRepository;
    }
    @Override
    public ResponseEntity createTopic(Topic topic){

        return new ResponseEntity(topicRepository.save(topic), HttpStatus.OK);
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public ResponseEntity updateTopics(long id, Topic topicDetails){

        Topic updateTopic = topicRepository.getReferenceById(id);
        if(topicRepository.existsById(id)){

            updateTopic.setSubject((topicDetails.getSubject()));
            updateTopic.setTopicName((topicDetails.getTopicName()));
            updateTopic.setCreatedBy(topicDetails.getCreatedBy());
            updateTopic.setModifiedBy((topicDetails.getModifiedBy()));

            return new ResponseEntity<>(topicRepository.save(updateTopic),HttpStatus.OK);

        }
        else {
            return null;
        }

    }
    @Override
    public ResponseEntity deleteTopicById(long id){
        if(topicRepository.existsById(id)){
            topicRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return null;
        }
    }

    public ResponseEntity getTopicBySubject(long subjectId){

        return new ResponseEntity(topicRepository.findTopicBySubject(subjectId),HttpStatus.OK);
    }
}
