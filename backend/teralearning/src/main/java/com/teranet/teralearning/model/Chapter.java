package com.teranet.teralearning.model;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL,targetEntity = Page.class)

    private List<Page> pages;

    public Chapter(){

    }
    public Chapter(long id, long courseId, String chapterName, List<Page> pages) {
        this.id = id;
        this.courseId = courseId;
        this.chapterName = chapterName;
        this.pages = pages;
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

    public List<Page> getPages() {
        return pages;
    }

    public void setPages(List<Page> pages) {
        this.pages = pages;
    }
}