package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "subject_table")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "stream_name")
    private String streamName;

    @Column(name = "subject_status")
    private String subjectStatus;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    public Subject(){

    }
    public Subject(long id, String subjectName, String streamName, String subjectStatus, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        Id = id;
        this.subjectName = subjectName;
        this.streamName = streamName;
        this.subjectStatus = subjectStatus;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getStreamName() {
        return streamName;
    }

    public void setStreamName(String streamName) {
        this.streamName = streamName;
    }

    public String getSubjectStatus() {
        return subjectStatus;
    }

    public void setSubjectStatus(String subjectStatus) {
        this.subjectStatus = subjectStatus;
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
}
