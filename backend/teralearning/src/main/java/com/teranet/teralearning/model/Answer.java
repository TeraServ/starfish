package com.teranet.teralearning.model;

import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="QuestionOption")
@Table(name = "answers")
public class Answer {
    @SequenceGenerator(
            name = "seqGenForAnswer",
            sequenceName = "ANSWER_SEQ",
            allocationSize = 1
    )
    @GeneratedValue (generator = "seqGenForAnswer",
    strategy = SEQUENCE)
    @Id
    private long answerId;
    @Column(name = "option_id", nullable = true)
    private int optionId;
    @Column(name = "answer_display_text",nullable = true)
    private String text;
    @Column(name = "is_correct",nullable = false)
    private boolean correct;
    @Column(name = "marks",nullable = false)
    private float value;
    @Column(name = "answer_text", nullable = false)
    private String answer;
    @Column(name = "disabled", nullable = true)
    private boolean disabled;
    @Column(name = "created_date",nullable = false)
    private LocalDateTime createdDate;
    @Column(name = "modified_date",nullable = false)
    private LocalDateTime modifiedDate;
    @Column(name = "owner",nullable = false)
    private String ownerEmail;
    @Column(name = "modifier",nullable = true)
    private String modifierEmail;
    public Answer(){}

    public Answer(long answerId, int optionId, String text, boolean correct, float value, String answer, boolean disabled, LocalDateTime createdDate, LocalDateTime modifiedDate, String ownerEmail, String modifierEmail) {
        this.answerId = answerId;
        this.optionId = optionId;
        this.text = text;
        this.correct = correct;
        this.value = value;
        this.answer = answer;
        this.disabled = disabled;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.ownerEmail = ownerEmail;
        this.modifierEmail = modifierEmail;
    }

    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }

    public int getOptionId() {
        return optionId;
    }

    public void setOptionId(int optionId) {
        this.optionId = optionId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
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

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public String getModifierEmail() {
        return modifierEmail;
    }

    public void setModifierEmail(String modifierEmail) {
        this.modifierEmail = modifierEmail;
    }
}
