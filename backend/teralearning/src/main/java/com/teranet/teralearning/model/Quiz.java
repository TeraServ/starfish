package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Quiz {
    @SequenceGenerator(
            name="seqGenForQuiz",
            sequenceName = "QUIZ_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(strategy = SEQUENCE,
            generator = "QUIZ_SEQ")
    @Id
    private long id;
    @Column(name = "quiz_name", unique = true)
    private String quizName;
    @OneToOne
    @JoinColumn(name = "topic",referencedColumnName = "id")
    private Topic topic;

    private long creator;

    private long modifier;
    @ElementCollection
    @CollectionTable(name = "quiz_questions")
    @Column(name = "questions")
    private List<Question> questions = new ArrayList<>();
    @Column(name = "pass_criteria")
    private long passCriteria;
    @Column(name = "allow_retake")
    private boolean allowRetake;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public long getCreator() {
        return creator;
    }

    public void setCreator(long creator) {
        this.creator = creator;
    }

    public void setModifier(long modifier) {
        this.modifier = modifier;
    }



    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public long getPassCriteria() {
        return passCriteria;
    }

    public void setPassCriteria(long passCriteria) {
        this.passCriteria = passCriteria;
    }

    public boolean isAllowRetake() {
        return allowRetake;
    }

    public void setAllowRetake(boolean allowRetake) {
        this.allowRetake = allowRetake;
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
