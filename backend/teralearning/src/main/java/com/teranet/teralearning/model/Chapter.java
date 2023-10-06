package com.teranet.teralearning.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chapter")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "course_id")
    private long courseId;

    @Column(name = "chapter_name")
    private String chapterName;

    @ManyToMany(cascade = CascadeType.ALL,targetEntity = ChapterBody.class)
    @JoinColumn(name = "id")
    private List<ChapterBody> bodies;


    public Chapter() {

    }

    public Chapter(long id, long courseId, String chapterName, List<ChapterBody> bodies) {
        this.id = id;
        this.courseId = courseId;
        this.chapterName = chapterName;
        this.bodies = bodies;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public List<ChapterBody> getBodies() {
        return bodies;
    }

    public void setBodies(List<ChapterBody> bodies) {
        this.bodies = bodies;
    }
}