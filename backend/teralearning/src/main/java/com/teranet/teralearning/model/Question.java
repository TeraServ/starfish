package com.teranet.teralearning.model;


import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


import java.time.LocalDateTime;
import java.util.HashSet;

import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;
@Data
@Entity(name="QuestionEntity")
@Table(name="questions")
public class Question {
    @SequenceGenerator(
            name="seqGenForQuestion",
            sequenceName = "QUESTION_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(strategy = SEQUENCE,
            generator = "QUESTION_SEQ")
    @Id
    private long Id;
    @OneToOne(targetEntity = Topic.class,cascade = CascadeType.MERGE)
    @JoinColumn(name="topic",referencedColumnName = "id", nullable = true)
    private Topic topic;
    @Column(name="question_type")
    @NotNull
    private String questionType;
    @Column(name="question_text")
    @NotNull
    private String questionText;
    @OneToMany(targetEntity = Answer.class, cascade = CascadeType.MERGE)
    private Set<Answer> answers;
    @Column(name = "explanation",nullable = true)
    private String explanation;
    @Column(name = "maximum_selection", nullable = false)
    private int maximumSelectionAllowed;
    @OneToOne(targetEntity = Quiz.class,cascade = CascadeType.MERGE)
    @JoinColumn(name="quiz",referencedColumnName = "id",nullable = false)
    private Quiz quizId;
    @Column(name="creator_id",nullable = false)
    private long creator;
    @Column(name="modifier_id",nullable = false)
    private long modifier;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    public Question(){}

    public Question(long id, Topic topic, String questionType, String questionText, Set<Answer> answers, String explanation, int maximumSelectionAllowed, Quiz quizId, long creator, long modifier, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        Id = id;
        this.topic = topic;
        this.questionType = questionType;
        this.questionText = questionText;
        this.answers = answers;
        this.explanation = explanation;
        this.maximumSelectionAllowed = maximumSelectionAllowed;
        this.quizId = quizId;
        this.creator = creator;
        this.modifier = modifier;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return Id;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
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

    public Quiz getQuizId() {
        return quizId;
    }

    public void setQuizId(Quiz quizId) {
        this.quizId = quizId;
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

    @Override
    public String toString() {
        return "Question{" +
                "Id=" + Id +
                ", topic=" + topic +
                ", questionType='" + questionType + '\'' +
                ", questionText='" + questionText + '\'' +
                ", answers=" + answers +
                ", explanation='" + explanation + '\'' +
                ", maximumSelectionAllowed=" + maximumSelectionAllowed +
                ", quizId=" + quizId +
                ", creator=" + creator +
                ", modifier=" + modifier +
                ", createdDate=" + createdDate +
                ", modifiedDate=" + modifiedDate +
                '}';
    }
}
