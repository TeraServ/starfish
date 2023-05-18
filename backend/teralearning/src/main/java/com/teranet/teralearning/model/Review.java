package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="review")
public class Review {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long Id;

    @OneToOne
    @JoinColumn(name = "stream_id")
    private Stream stream;
    @OneToOne(cascade = CascadeType.MERGE,targetEntity = User.class)
    @JoinColumn(name="author",referencedColumnName = "id")
    private User user;

    @Column(name = "rating",nullable = true)
    private long rate;

    @Column(name = "comments",nullable = true)
    private String comment;
    @Column(name = "date")
    private LocalDateTime createdDate;

    protected Review(){}
    public Review(long id, Stream stream, User user, long rate, String comment, LocalDateTime createdDate) {
        Id = id;
        this.stream = stream;
        this.user = user;
        this.rate = rate;
        this.comment = comment;
        this.createdDate = createdDate;
    }

    public Stream getStream() {
        return stream;
    }

    public void setStream(Stream stream) {
        this.stream = stream;
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
}
