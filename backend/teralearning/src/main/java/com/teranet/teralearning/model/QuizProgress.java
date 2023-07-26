package com.teranet.teralearning.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.HashMap;

@Entity
@Component
@Table(name = "quiz_progress")
public class QuizProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "quiz_id")
    private long quizId;
    @Column (name = "student_id")
    private long studentId;
    @Column (name = "test_status")
    private long testStatus;
    @Column (name = "submitted_answers")
    private HashMap<Long,String > submittedAnswer = new HashMap<>();
    public QuizProgress(){}

    public QuizProgress(long id, long quizId, long studentId, long testStatus, HashMap<Long, String> submittedAnswer) {
        this.id = id;
        this.quizId = quizId;
        this.studentId = studentId;
        this.testStatus = testStatus;
        this.submittedAnswer = submittedAnswer;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getTestStatus() {
        return testStatus;
    }

    public void setTestStatus(long testStatus) {
        this.testStatus = testStatus;
    }

    public HashMap<Long, String> getSubmittedAnswer() {
        return submittedAnswer;
    }

    public void setSubmittedAnswer(HashMap<Long, String> submittedAnswer) {
        this.submittedAnswer = submittedAnswer;
    }
}
