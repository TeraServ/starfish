package com.teranet.teralearning.util;

import com.teranet.teralearning.dto.optionResponseDTO;
import com.teranet.teralearning.dto.questionResponseDTO;
import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.model.*;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
@AllArgsConstructor
public class ValueMapper {

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
}
