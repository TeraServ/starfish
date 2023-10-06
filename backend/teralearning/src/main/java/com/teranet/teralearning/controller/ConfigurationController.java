package com.teranet.teralearning.controller;

import com.teranet.teralearning.service.QuestionConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping(value = "api/configurations/")
public class ConfigurationController {
    @Autowired
    private QuestionConfigService questionConfigService;
    @GetMapping("default-question-configs")
    public ResponseEntity getQuestionConfigs(){
        return questionConfigService.getQuestionConfigs();
    }
}
