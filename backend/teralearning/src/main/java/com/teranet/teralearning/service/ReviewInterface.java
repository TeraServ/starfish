package com.teranet.teralearning.service;

import com.teranet.teralearning.dto.reviewResponseDTO;
import com.teranet.teralearning.model.Review;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReviewInterface {
    public ResponseEntity createReview (Review review);
    public List<reviewResponseDTO> getAllReview();
}
