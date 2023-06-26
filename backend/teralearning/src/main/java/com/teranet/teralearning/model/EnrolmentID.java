package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
//Composite PK
public class EnrolmentID implements Serializable {
    @Column(name = "student_id")
    private long studentId;
    @Column(name = "course_id")
    private long streamId;

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getStreamId() {
        return streamId;
    }

    public void setStreamId(long streamId) {
        this.streamId = streamId;
    }
}
