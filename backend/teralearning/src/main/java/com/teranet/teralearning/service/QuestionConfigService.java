package com.teranet.teralearning.service;

import com.teranet.teralearning.model.QuestionConfigs;
import com.teranet.teralearning.repository.QuestionConfigRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class QuestionConfigService implements QuestionConfigInterface{
    private QuestionConfigRepository questionConfigRepository;

    public QuestionConfigService(QuestionConfigRepository questionConfigRepository) {
        this.questionConfigRepository = questionConfigRepository;
    }
    @Override
    public ResponseEntity addQuestionConfig(QuestionConfigs questionConfigs){
        try{
            if(questionConfigs !=null && !questionConfigRepository.existsByQuestionType(questionConfigs.getQuestionType())){
                questionConfigs.setCreatedDate(getDateOnly());
                questionConfigs.setModifiedDate(getDateOnly());
                return new ResponseEntity(questionConfigRepository.save(questionConfigs),HttpStatus.CREATED);
            }else{
                return new ResponseEntity("Error",HttpStatus.CONFLICT);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>("Exception Occurred", HttpStatus.BAD_REQUEST);
        }
    }
    @Override
    public ResponseEntity getQuestionConfigs(){
        return new ResponseEntity(questionConfigRepository.findAll(),HttpStatus.OK);
    }
    @Override
    public void setDefaultQuestionConfig(){
        setDefaultSingleAnswer();
        setDefaultMCQ();
        setDefaultMSQ();
    }
    private void setDefaultSingleAnswer(){
        QuestionConfigs saQuestionConfigs = new QuestionConfigs();
        saQuestionConfigs.setQuestionType("singleAnswer");
        saQuestionConfigs.setMaximumMark(1);
        saQuestionConfigs.setNegativeMark(-0.25);
        saQuestionConfigs.setMaximumOptionLength(100);
        saQuestionConfigs.setMaximumOptionSelections(0);
        saQuestionConfigs.setModifiedDate(getDateOnly());
        saQuestionConfigs.setCreatedDate(getDateOnly());
        saQuestionConfigs.setActive(true);
        questionConfigRepository.save(saQuestionConfigs);
    }
    private void setDefaultMCQ(){
        QuestionConfigs mcqQuestionConfigs = new QuestionConfigs();
        mcqQuestionConfigs.setQuestionType("multipleChoice");
        mcqQuestionConfigs.setMaximumMark(2);
        mcqQuestionConfigs.setNegativeMark(-0.5);
        mcqQuestionConfigs.setMinimumOptionsCount(2);
        mcqQuestionConfigs.setMaximumOptionLength(100);
        mcqQuestionConfigs.setMaximumOptionSelections(1);
        mcqQuestionConfigs.setModifiedDate(getDateOnly());
        mcqQuestionConfigs.setCreatedDate(getDateOnly());
        mcqQuestionConfigs.setActive(true);
        questionConfigRepository.save(mcqQuestionConfigs);
    }
    private void setDefaultMSQ(){
        QuestionConfigs msqQuestionConfigs = new QuestionConfigs();
        msqQuestionConfigs.setQuestionType("multipleSelect");
        msqQuestionConfigs.setMaximumMark(3);
        msqQuestionConfigs.setNegativeMark(0);
        msqQuestionConfigs.setMinimumOptionsCount(2);
        msqQuestionConfigs.setMaximumOptionLength(100);
        msqQuestionConfigs.setModifiedDate(getDateOnly());
        msqQuestionConfigs.setCreatedDate(getDateOnly());
        msqQuestionConfigs.setActive(true);
        questionConfigRepository.save(msqQuestionConfigs);
    }


    private static LocalDateTime getDateOnly(){
        return LocalDateTime.now();
    }
}
