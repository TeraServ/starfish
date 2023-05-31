package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.model.Review;
import com.teranet.teralearning.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping(value = "/api/review/")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @PostMapping(value = "new")
    public ResponseEntity<Review> addAReview(@RequestBody Review review){
        return reviewService.createReview(review);
    }

    @GetMapping(value="listall")
    public List<reviewResponseDTO> getAllReview(){
      log.info("ReviewController:getAllReview:Init...");
      return reviewService.getAllReview();
    }



}
