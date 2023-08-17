package com.teranet.teralearning.util;

import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.model.*;
import com.teranet.teralearning.repository.TopicRepository;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
@AllArgsConstructor
public class ValueMapper {
    private TopicRepository topicRepository;
public static User convertToUserEntity(userResponseDTO userResponseDTO){
    User user = new User();
    user.setFirstName(userResponseDTO.getFirstname());
    user.setLastName(userResponseDTO.getLastName());
    user.setUserType(userResponseDTO.getUserType());
    user.setEmail(userResponseDTO.getEmail());
    return user;
}
public static userResponseDTO convertToUserDTO(User user){
    userResponseDTO userResponseDTO = new userResponseDTO();
    userResponseDTO.setFirstname(user.getFirstName());
    userResponseDTO.setLastName(user.getLastName());
    userResponseDTO.setEmail(user.getEmail());
    userResponseDTO.setId(user.getId());
    return userResponseDTO;
}
public static reviewResponseDTO convertReviewToReviewDTO(Review review){
    reviewResponseDTO responseDTO =  new reviewResponseDTO();
    responseDTO.setId(review.getId());
    responseDTO.setAuthor(review.getUser().getFirstName());
    responseDTO.setComment(review.getComment());
    responseDTO.setRating(review.getRate());
    responseDTO.setDate(review.getModifiedDate());
    return responseDTO;
}
private  Topic getTopicFromTopicId(long topicId){
    return topicRepository.findById(topicId).orElse(null);
}
public  Question questionDTOtoQuestion(questionResponseDTO questionDTO){
    Question question = new Question();
    question.setQuizId(questionDTO.getQuizId());
    question.setTopic(getTopicFromTopicId(questionDTO.getTopic()));
    question.setQuestionType(questionDTO.getType());
    question.setQuestionText(questionDTO.getQuestionText());
    question.setAnswers(getAnswersFromAnswerDTOs(questionDTO.getAnswers()));
    question.setExplanation(questionDTO.getExplanation());
    question.setMaximumSelectionAllowed(questionDTO.getMaxSelection());
    return question;
}
public Set<Answer> getAnswersFromAnswerDTOs(Set<optionResponseDTO> optionResponseDTOS) {
    return optionResponseDTOS
            .stream()
            .map(this::answerDTOtoAnswer)
            .collect(Collectors.toSet());
}
public Answer answerDTOtoAnswer(optionResponseDTO answerDTO){
    Answer answer = new Answer();
    answer.setOptionId(answerDTO.getOptionId());
    answer.setText(answerDTO.getText());
    answer.setCorrect(answerDTO.getCorrect());
    answer.setValue(answerDTO.getValue());
    answer.setAnswer(answerDTO.getAnswer());
    answer.setDisabled(answerDTO.getDisabled());
    return answer;
}
}
