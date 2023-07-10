package com.teranet.teralearning.controller;
import com.teranet.teralearning.model.Notification;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notification/")
public class NotificationController {
    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("new")
    public ResponseEntity newNotification(@RequestBody Notification notification){
        return notificationService.createNotification(notification);
    }
    @GetMapping("list")
    public ResponseEntity getNotification(){
        return new ResponseEntity(notificationService.getNotifications(),HttpStatus.OK);
    }
}
