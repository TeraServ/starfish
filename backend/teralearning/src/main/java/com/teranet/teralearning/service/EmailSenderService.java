package com.teranet.teralearning.service;

import com.teranet.teralearning.model.SimpleMailBody;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@NoArgsConstructor
@AllArgsConstructor
public class EmailSenderService implements EmailSenderInterface{
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;
    @Override
    public String sendSimpleMail(SimpleMailBody simpleMailBody){
        try{
            log.info("EmailSenderService:sendSimpleMail: Init..");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(simpleMailBody.getRecipient());
            mailMessage.setSubject(simpleMailBody.getSubject());
            mailMessage.setText(simpleMailBody.getMsgBody());
            javaMailSender.send(mailMessage);
            log.info("EmailSenderService:sendSimpleMail: Mail send to"+simpleMailBody.getRecipient());
            return "Success: Mail Send";
        }
        catch(Exception ex){
            log.error("EmailSenderService:sendSimpleMail: Exception occurred:"+ex);
            return "Error while sending mail";
        }

    }

}
