package com.teranet.teralearning.service;

import com.teranet.teralearning.repository.QuestionConfigRepository;
import com.teranet.teralearning.repository.UserRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Slf4j
public class CronJobService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuestionConfigRepository questionConfigRepository;
    @Autowired
    private QuestionConfigService questionConfigService;
    @Autowired
    private DeletedRecordsService deletedRecordsService;
    public CronJobService(){}

    public CronJobService(UserRepository userRepository, DeletedRecordsService deletedRecordsService) {
        this.userRepository = userRepository;
        this.deletedRecordsService = deletedRecordsService;
    }
    @SneakyThrows
    @Scheduled(cron = "0 * 9 * * ?")
    @Async
    public void checkForDeletedUsers(){
        //Cron Job scheduled between 9am - 10am.
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm::ss.SSS");
        Date now = new Date();
        String strDate = sdf.format(now);
        log.info("CronJobService:checkDeletedUsers Init... at: "+strDate);
        userRepository.findAll().stream()
                .forEach(user->{
                    deletedRecordsService.checkDeletionDate(user.getClass().getSimpleName(), user.getId());
                });

    }
    @SneakyThrows
    @Scheduled(cron = "0 50 10 * * *")
    @Async
    public void addDefaultQuestionConfigs(){
      boolean hasOneActiveQuestionType = questionConfigRepository.findAll().stream()
              .anyMatch(questionType->questionType.isActive() == true);
      if(!hasOneActiveQuestionType) {
          questionConfigService.setDefaultQuestionConfig();
      }

    }

}
