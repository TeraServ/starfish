package com.teranet.teralearning.model;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="QuestionEntity")
@Table(name="questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @Column(name="question_type")
    @NotNull
    private String questionType;
    @Column(name="question_text",length = 512)
    @NotNull
    private String questionText;
    @OneToMany(targetEntity = Answer.class, cascade = CascadeType.ALL)
    private Set<Answer> answers;
    @Column(name = "explanation",nullable = true,length = 512)
    private String explanation;
    @Column(name = "maximum_selection", nullable = false)
    private int maximumSelectionAllowed;

    @OneToOne(targetEntity = Quiz.class,cascade = CascadeType.MERGE)
    private Quiz quiz;
    @Column(name="creator_id",nullable = false)
    private long creator;
    @Column(name="modifier_id",nullable = false)
    private long modifier;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    public Question(){}

    public Question(long id, String questionType, String questionText, Set<Answer> answers, String explanation, int maximumSelectionAllowed, Quiz quiz, long creator, long modifier, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        Id = id;
        this.questionType = questionType;
        this.questionText = questionText;
        this.answers = answers;
        this.explanation = explanation;
        this.maximumSelectionAllowed = maximumSelectionAllowed;
        this.quiz = quiz;
        this.creator = creator;
        this.modifier = modifier;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return Id;
    }


    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public int getMaximumSelectionAllowed() {
        return maximumSelectionAllowed;
    }

    public void setMaximumSelectionAllowed(int maximumSelectionAllowed) {
        this.maximumSelectionAllowed = maximumSelectionAllowed;
    }

    public void setId(long id) {
        Id = id;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public long getCreator() {
        return creator;
    }

    public void setCreator(long creator) {
        this.creator = creator;
    }

    public long getModifier() {
        return modifier;
    }

    public void setModifier(long modifier) {
        this.modifier = modifier;
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
