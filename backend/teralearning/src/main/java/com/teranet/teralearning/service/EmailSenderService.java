package com.teranet.teralearning.service;

import com.teranet.teralearning.model.SimpleMailBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class EmailSenderService extends Thread{

    @Autowired
    private JavaMailSender javaMailSender;

    private SimpleMailBody simpleMailBody;
    @Value("${spring.mail.username}") private String sender;
    public  EmailSenderService(){}

    public EmailSenderService(JavaMailSender javaMailSender, SimpleMailBody simpleMailBody) {
        this.javaMailSender = javaMailSender;
        this.simpleMailBody = simpleMailBody;
    }
    public String sendSimpleMail(SimpleMailBody simpleMailBody){
        try{
            log.info("EmailSenderService:sendSimpleMail: Init..");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(simpleMailBody.getRecipient());
            mailMessage.setSubject(simpleMailBody.getSubject());
            mailMessage.setText(simpleMailBody.getMsgBody());
            javaMailSender.send(mailMessage);
            log.info("EmailSenderService:sendSimpleMail: Mail send to:"+simpleMailBody.getRecipient());
            return "Success: Mail Send";
        }
        catch(Exception ex){
            log.error("EmailSenderService:sendSimpleMail: Exception occurred:");
            ex.printStackTrace();
            return "Error while sending mail";
        }

    }
    @Override
    public void run(){
        try{

            String mailStatus = sendSimpleMail(simpleMailBody);
            log.info("EmailService:run Status:"+mailStatus);
        }
        catch (Exception ex){
            log.error("EmailService:run Exception Occurred:");
            ex.printStackTrace();
        }
    }

}
