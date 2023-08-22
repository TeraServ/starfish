package com.teranet.teralearning.service;

import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.model.Answer;
import com.teranet.teralearning.model.Question;
import com.teranet.teralearning.model.Topic;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.AnswerSetRepository;
import com.teranet.teralearning.repository.TopicRepository;
import com.teranet.teralearning.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor

@Service

public class ModelMapperService {
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AnswerSetRepository answerSetRepository;
    public ModelMapperService(){}

    private User getUserFromEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
    private Topic getTopicFromTopicId(long topicId){
        return topicRepository.findById(topicId).orElse(null);
    }


    public Question questionDTOtoQuestion(questionResponseDTO questionDTO) {
        log.info("ModelMapperService:questionDTOtoQuestion Init...");
        log.trace("ModelMapperService:questionDTOtoQuestion QuestionDTO Body:"+questionDTO.toString());
        Question question = new Question();
        question.setQuizId(questionDTO.getQuizId());
        question.setTopic(getTopicFromTopicId(questionDTO.getTopic()));
        question.setQuestionType(questionDTO.getType());
        question.setQuestionText(questionDTO.getQuestionText());
        question.setAnswers(getAnswersFromAnswerDTOs(questionDTO.getAnswers()));
        question.setExplanation(questionDTO.getExplanation());
        question.setMaximumSelectionAllowed(questionDTO.getMaxSelection());
        question.setQuizId(questionDTO.getQuizId());
        question.setCreator(getUserFromEmail(questionDTO.getCreator()));
        question.setModifier(getUserFromEmail(questionDTO.getModifier()));
        log.info("ModelMapperService:questionDTOtoQuestion Question Body:"+question.toString());
        return question;
    }
    public Set<Answer> getAnswersFromAnswerDTOs(Set<optionResponseDTO> optionResponseDTOS) {
        log.info("ModelMapperService:getAnswersFromAnswerDTOs Init...");
        return optionResponseDTOS
                .stream()
                .map(answerDTO->answerDTOtoAnswer(answerDTO))
                .collect(Collectors.toSet());
    }
    public Answer answerDTOtoAnswer(optionResponseDTO answerDTO){
        try {
            log.info("ModelMapperService:answerDTOtoAnswer Init...");
            Answer answer = new Answer();
            answer.setOptionId(answerDTO.getOptionId());
            answer.setText(answerDTO.getText());
            answer.setCorrect(answerDTO.getCorrect());
            answer.setValue(answerDTO.getValue());
            answer.setAnswer(answerDTO.getAnswer());
            answer.setDisabled(answerDTO.getDisabled());
            log.info("ModelMapperService:answerDTOtoAnswer Answer Body:" + answer.toString());
            return answerSetRepository.save(answer);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
}
