package com.teranet.teralearning.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="pages")
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    public Page(){

    }
    public Page(long id, String title, String body) {
        Id = id;
        this.title = title;
        this.body = body;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
