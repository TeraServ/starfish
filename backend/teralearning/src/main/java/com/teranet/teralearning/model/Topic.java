
package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;



@Entity
@Table(name = "topic")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @OneToOne(targetEntity = Subject.class,cascade = CascadeType.MERGE)
    @JoinColumn(name = "subject",referencedColumnName = "id",nullable = false)
    private Subject subject;

    @Column(name = "topic_name")
    private String topicName;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "modified_by")
    private String modifiedBy;

    public Topic(){}


    public Topic(long id, Subject subject, String topicName, LocalDateTime createdDate, LocalDateTime modifiedDate, String createdBy, String modifiedBy) {
        Id = id;
        this.subject = subject;
        this.topicName = topicName;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }


    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }
}

