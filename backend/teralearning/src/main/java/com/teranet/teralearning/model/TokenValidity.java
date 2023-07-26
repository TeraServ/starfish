package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "token")
@Table(name="token_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenValidity {
    @SequenceGenerator(
            name = "seqToken",
            sequenceName = "TOKEN_SEQ",
            allocationSize =1
    )
    @GeneratedValue(strategy = SEQUENCE,
    generator ="TOKEN_SEQ" )
    @Id
    private long id;
    @OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @Column(name = "token", nullable = true)
    private String token;
    @Column(name="created_date")
    private LocalDate createdDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
