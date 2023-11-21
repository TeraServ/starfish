package com.teranet.teralearning.model;


import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "description", length = 512)
    private String description;

    @Column(name = "created_by")
    private long createdBy;
    @Column(name = "cover_url")
    private String coverUrl;
    @OneToOne(targetEntity = Topic.class, cascade = CascadeType.MERGE)
    private Topic topic;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    private List<Chapter> chapters = new ArrayList<>();

    @Column(name = "modified_date")
    private LocalDate modifiedData;
    @Column(name = "created_date")
    private LocalDate createdDate;

    public Course() {
    }

    public Course(long id, String courseName, String description, long createdBy, String coverUrl, Topic topic, List<Chapter> chapters, LocalDate modifiedData, LocalDate createdDate) {
        Id = id;
        this.courseName = courseName;
        this.description = description;
        this.createdBy = createdBy;
        this.coverUrl = coverUrl;
        this.topic = topic;
        this.chapters = chapters;
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

    public long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    public LocalDate getModifiedData() {
        return modifiedData;
    }

    public void setModifiedData(LocalDate modifiedData) {
        this.modifiedData = modifiedData;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}
