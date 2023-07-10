package com.teranet.teralearning.service;
import com.teranet.teralearning.model.Notification;
import com.teranet.teralearning.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService implements NotificationInterface{
    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }
    @Override
    public ResponseEntity createNotification(Notification notification) {
        return new ResponseEntity(notificationRepository.save(notification), HttpStatus.OK);
    }
    @Override
    public ResponseEntity<List<Notification>> getNotifications() {
        return new ResponseEntity<List<Notification>>(notificationRepository.findByOrderByCreatedDateDesc(),HttpStatus.OK);
    }
}
