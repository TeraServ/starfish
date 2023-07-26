package com.teranet.teralearning.model;


import org.springframework.stereotype.Component;

import javax.persistence.*;


import java.time.LocalDateTime;
import java.util.HashSet;

import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="QuestionEntity")
@Component
@Table(name="questions")
public class Question {
    @SequenceGenerator(
            name="seqGenForQuestion",
            sequenceName = "QUESTION_SEQ",
            allocationSize = 1
    )
    @GeneratedValue (strategy = SEQUENCE,
    generator = "QUESTION_SEQ")
    @Id
    private long id;
    @OneToOne
    @JoinColumn(name="topic",referencedColumnName = "id")
    private Topic topic;
    @Column(name="question_type",nullable = false)
    private int questionType;
    @Column(name="question",nullable = false)
    private String question;
    @ElementCollection
    @CollectionTable(name = "questions_options")
    @Column(name="options",nullable = true)
    private Set<String> options = new HashSet<String>();
    @ElementCollection
    @CollectionTable(name = "questions_answer")
    @Column(name="answer")
    private Set<String> answer = new HashSet<String>();
    @Column(name = "explanation",nullable = true)
    private String explanation;
    @Column(name="maximum_marks",nullable = true)
    private int maxMarks;
    @Column(name="quiz_id",nullable = true)
    private long quizId;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    public Question(){}

    public Question(Topic topic, int questionType, String question, Set<String> options, Set<String> answer, String explanation, int maxMarks, long quizId, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.topic = topic;
        this.questionType = questionType;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.explanation = explanation;
        this.maxMarks = maxMarks;
        this.quizId = quizId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public int getQuestionType() {
        return questionType;
    }

    public void setQuestionType(int questionType) {
        this.questionType = questionType;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Set<String> getOptions() {
        return options;
    }

    public void setOptions(Set<String> options) {
        this.options = options;
    }

    public Set<String> getAnswer() {
        return answer;
    }

    public void setAnswer(Set<String> answer) {
        this.answer = answer;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public int getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(int maxMarks) {
        this.maxMarks = maxMarks;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
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
