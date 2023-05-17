package com.teranet.teralearning.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "streams")
public class Stream {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long Id;

    @Column(name = "stream_name")
    private String streamName;


    @Column(name = "price")
    private double price;
    @Column(name = "discount")
    private double discount;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "stream_status")
    private int streamStatus;



    public Stream() {
    }

    public Stream(long id, String streamName, double price, double discount, LocalDateTime createdDate, LocalDateTime modifiedDate, int streamStatus) {
        Id = id;
        this.streamName = streamName;
        this.price = price;
        this.discount = discount;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.streamStatus = streamStatus;
    }

    public int getStreamStatus() {
        return streamStatus;
    }

    public void setStreamStatus(int streamStatus) {
        this.streamStatus = streamStatus;
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

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getStreamName() {
        return this.streamName;
    }

    public void setStreamName(String streamName) {
        this.streamName = streamName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
