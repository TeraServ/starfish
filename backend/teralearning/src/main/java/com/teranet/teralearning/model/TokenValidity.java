package com.teranet.teralearning.model;

import jdk.jfr.DataAmount;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="token_table")
public class TokenValidity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @Column(name = "token")
    private String token;
    @Column(name="created_date")
    private LocalDate createdDate;
    protected TokenValidity(){}

    public TokenValidity(long id, User user, String token, LocalDate createdDate) {
        Id = id;
        this.user = user;
        this.token = token;
        this.createdDate = createdDate;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}
