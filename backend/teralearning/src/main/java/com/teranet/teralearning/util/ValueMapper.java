package com.teranet.teralearning.util;

import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.model.Review;
import com.teranet.teralearning.model.User;

import java.time.LocalDateTime;

public class ValueMapper {
public static User convertToUserEntity(userResponseDTO userResponseDTO){
    User user = new User();
    user.setFirstName(userResponseDTO.getFirstname());
    user.setLastName(userResponseDTO.getLastName());
    user.setUserType(userResponseDTO.getUserType());
    user.setEmail(userResponseDTO.getEmail());
    return user;
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
