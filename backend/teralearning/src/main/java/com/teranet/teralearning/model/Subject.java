package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "subject_table")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(name = "subject_name")
    private String subjectName;


    @OneToMany(targetEntity = Stream.class,cascade = CascadeType.MERGE)

    private List<Stream> stream;

    @Column(name = "subject_status")
    private int subjectStatus;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    public Subject(){

    }

    public Subject(long id, String subjectName, List<Stream> stream, int subjectStatus, LocalDateTime createdDate, LocalDateTime modifiedDate) {

        Id = id;
        this.subjectName = subjectName;
        this.stream = stream;
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

    public List<Stream> getStreamName() {
        return stream;
    }

    public void setStreamName(List<Stream> stream) {
        this.stream = stream;
    }

    public int getSubjectStatus() {
        return subjectStatus;
    }

    public void setSubjectStatus(int subjectStatus) {
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
