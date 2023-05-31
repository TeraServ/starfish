package com.teranet.teralearning.service;


import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.model.Review;
import com.teranet.teralearning.repository.ReviewRepository;
import com.teranet.teralearning.repository.UserRepository;
import com.teranet.teralearning.util.DateUtility;
import com.teranet.teralearning.util.JsonUtility;
import com.teranet.teralearning.util.ValueMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

import javax.transaction.Transactional;
import java.util.stream.Collectors;
@Slf4j
@Service
@AllArgsConstructor
@NoArgsConstructor


public class ReviewService implements ReviewInterface{
private ReviewRepository reviewRepository;
private DateUtility dateUtility;
private JsonUtility jsonUtility;
public ReviewService (ReviewRepository reviewRepository){
    this.reviewRepository=reviewRepository;
}
    @Override
    @Transactional
    public ResponseEntity createReview(Review review){
    try{
        if(review!=null){
            log.info("ReviewService:createReview:Init...");
            review.setId(0);
            review.setCreatedDate(dateUtility.getDate());
            review.setModifiedDate(dateUtility.getDate());
            return new ResponseEntity<Review> (reviewRepository.save(review),HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity(jsonUtility.getJson("The review body is null","Error"),HttpStatus.BAD_REQUEST);
        }
    }catch (Exception ex){
        log.error("Exception occurred while creating a Reviews");
    }
    log.info("ReviewService:createReview execution ended");
        return new ResponseEntity(HttpStatus.CONFLICT);

}
@Override
public List<reviewResponseDTO> getAllReview(){
    try{
        List<reviewResponseDTO> reviews= reviewRepository.findAll()
                .stream()
                .map(review->ValueMapper.convertReviewToReviewDTO(review))
                .collect(Collectors.toList());
        return reviews;
    }
    catch(Exception exception){
        return null;
    }
}


}
