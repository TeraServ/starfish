package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="reviewEntity")
@Table(name="review")
public class Review {
    @SequenceGenerator(
            name = "review_sequence",
            sequenceName = "review_sequence_gen",
            allocationSize = 1
    )
    @GeneratedValue(strategy = SEQUENCE,
            generator = "review_sequence_gen")
    @Id

    private long Id;

    @OneToOne
    @JoinColumn(name = "stream_id")
    private Stream stream;


    @Column(name = "test_id", nullable = true)
    private long testId;
    @Column(name = "course_id", nullable = true)
    private long courseId;

    @OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
    @JoinColumn(name = "author", referencedColumnName = "id")
    private User user;

    @Column(name = "rating", nullable = true)
    private long rate;

    @Column(name = "comments", nullable = true)
    private String comment;
    @Column(name = "date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    protected Review() {
    }


    public Review(long testId, long courseId, User user, int rate, String comment, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.Id = Id;
        this.testId = testId;
        this.courseId = courseId;
        this.user = user;
        this.rate = rate;
        this.comment = comment;
        this.createdDate = createdDate;

    }

    public Stream getStream() {
        return stream;
    }


    public long getTestId() {
        return testId;
    }

    public void setTestId(long testId) {
        this.testId = testId;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;

    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getRate() {
        return rate;
    }

    public void setRate(long rate) {
        this.rate = rate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
