package com.teranet.teralearning.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "question_configs")
public class QuestionConfigs {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "question_type")
    @NotNull
    private String questionType;
    @Column(name = "maximum_mark")
    @NotNull
    private double maximumMark;
    @Column(name = "negative_mark")
    private double negativeMark;
    @Column(name = "minimum_options")
    private int minimumOptionsCount;
    @Column(name="maximum_option_length")
    private int maximumOptionLength;
    @Column(name="maximum_option_selections")
    private int maximumOptionSelections;
    @Column(name = "is_active")
    private boolean isActive;
    @Column(name="created_date")
    private LocalDateTime createdDate;
    @Column(name="modified_date")
    private LocalDateTime modifiedDate;
    public QuestionConfigs(){}

    public QuestionConfigs(long id, String questionType, double maximumMark, double negativeMark, int minimumOptionsCount, int maximumOptionLength, int maximumOptionSelections, boolean isActive, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.questionType = questionType;
        this.maximumMark = maximumMark;
        this.negativeMark = negativeMark;
        this.minimumOptionsCount = minimumOptionsCount;
        this.maximumOptionLength = maximumOptionLength;
        this.maximumOptionSelections = maximumOptionSelections;
        this.isActive = isActive;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public double getMaximumMark() {
        return maximumMark;
    }

    public void setMaximumMark(double maximumMark) {
        this.maximumMark = maximumMark;
    }

    public double getNegativeMark() {
        return negativeMark;
    }

    public void setNegativeMark(double negativeMark) {
        this.negativeMark = negativeMark;
    }

    public int getMinimumOptionsCount() {
        return minimumOptionsCount;
    }

    public void setMinimumOptionsCount(int minimumOptionsCount) {
        this.minimumOptionsCount = minimumOptionsCount;
    }

    public int getMaximumOptionLength() {
        return maximumOptionLength;
    }

    public void setMaximumOptionLength(int maximumOptionLength) {
        this.maximumOptionLength = maximumOptionLength;
    }

    public int getMaximumOptionSelections() {
        return maximumOptionSelections;
    }

    public void setMaximumOptionSelections(int maximumOptionSelections) {
        this.maximumOptionSelections = maximumOptionSelections;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
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
