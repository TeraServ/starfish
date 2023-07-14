package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Notification;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationInterface {
    ResponseEntity createNotification(Notification notification);

    ResponseEntity<List<Notification>> getNotifications();
}
