package com.teranet.teralearning.service;

import com.teranet.teralearning.model.QuestionConfigs;
import org.springframework.http.ResponseEntity;

public interface QuestionConfigInterface {
    public ResponseEntity addQuestionConfig(QuestionConfigs questionConfigs);
    public ResponseEntity getQuestionConfigs();
    public void setDefaultQuestionConfig();
}
