package com.teranet.teralearning.service;

import com.teranet.teralearning.dto.QuizDTO;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.repository.CourseRepository;
import com.teranet.teralearning.repository.QuizRepository;
import com.teranet.teralearning.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService implements TopicInterface{

    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private CourseRepository courseRepository;

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

            updateTopic.setTopicName((topicDetails.getTopicName()));
            updateTopic.setCreatedBy(topicDetails.getCreatedBy());
            updateTopic.setModifiedBy((topicDetails.getModifiedBy()));

            return new ResponseEntity<>(topicRepository.save(updateTopic),HttpStatus.OK);

        }
        else {
            return null;
        }

    }
    private boolean isMappedToQuiz(long topicId){
        return quizRepository.existsByTopic_Id(topicId);
    }
    private boolean isMappedToCourse(long topicId){
        return courseRepository.existsByTopic_Id(topicId);
    }
    @Override
    public ResponseEntity deleteTopicById(long id){
        Optional<Topic> deletedTopic = topicRepository.findById(id);
        if(deletedTopic.isPresent() && !isMappedToCourse(id) && !isMappedToQuiz(id)){
            topicRepository.deleteById(id);
            return new ResponseEntity<>(deletedTopic.get().getTopicName()+" was successfully deleted.",HttpStatus.OK);
        }
        else {
            return new ResponseEntity("Topic Mapped to Quiz/Course",HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity getTopicBySubjectId(long id){
        return new ResponseEntity(topicRepository.findTopicsBySubject(id),HttpStatus.OK);
    }

    public ResponseEntity getTopicBySubject(long subjectId){

        return new ResponseEntity(topicRepository.findTopicBySubject(subjectId),HttpStatus.OK);
    }
}
