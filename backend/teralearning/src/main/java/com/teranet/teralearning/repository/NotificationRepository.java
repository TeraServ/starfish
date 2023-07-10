package com.teranet.teralearning.repository;
import com.teranet.teralearning.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("select n from Notification n order by n.createdDate DESC")
    List<Notification> findByOrderByCreatedDateDesc();
}
