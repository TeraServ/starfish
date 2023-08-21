package com.teranet.teralearning.model;


import javax.persistence.*;
import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_by")
    private long createdBy;
    @Column(name = "cover_url")
    private String coverUrl;
    @Column(name = "topic_name")
    private String topicName;

//    @OneToMany(fetch = FetchType.EAGER)
//    private Set<Chapter> chapters = new HashSet<>();

    @Column(name = "modified_date")
    private String modifiedData;
    @Column(name = "created_date")
    private String createdDate;

    public Course(){}

    public Course(long id, String courseName, String description, long createdBy, String coverUrl, String topicName, String modifiedData, String createdDate) {
        Id = id;
        this.courseName = courseName;
        this.description = description;
        this.createdBy = createdBy;
        this.coverUrl = coverUrl;
        this.topicName = topicName;
        this.modifiedData = modifiedData;
        this.createdDate = createdDate;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getModifiedData() {
        return modifiedData;
    }

    public void setModifiedData(String modifiedData) {
        this.modifiedData = modifiedData;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}
