package com.teranet.teralearning.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.lang.Nullable;


import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chapterBody")

public class ChapterBody {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "type")
    private String type;

    @OneToOne(cascade = CascadeType.ALL,targetEntity = Quiz.class,optional = true)
    @Nullable
    private Quiz quizList;


    @OneToOne(cascade = CascadeType.ALL,targetEntity = Page.class,optional = true)
    @Nullable
    private Page pages;


    public ChapterBody() {
    }

    public ChapterBody(long id, String type, Quiz quizList, Page pages) {
        this.id = id;
        this.type = type;
        this.quizList = quizList;
        this.pages = pages;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Quiz getQuizList() {
        return quizList;
    }

    public void setQuizList(Quiz quizList) {
        this.quizList = quizList;
    }

    public Page getPages() {
        return pages;
    }

    public void setPages(Page pages) {
        this.pages = pages;
    }


}
