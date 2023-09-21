package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.model.Course;
import org.springframework.http.ResponseEntity;

public interface CourseInterface {
    ResponseEntity addCourse(Course course);

    ResponseEntity getAllCourse();

    ResponseEntity getCourseByUserId(long userId);


}
