package com.teranet.teralearning.service;


import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.model.Course;
import com.teranet.teralearning.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CourseService implements CourseInterface {

    @Autowired
    private CourseRepository courseRepository;
    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    @Override
    public ResponseEntity addCourse(Course course){
        return new ResponseEntity(courseRepository.save(course), HttpStatus.OK);
    }

    @Override
    public ResponseEntity getAllCourse() {
        return new ResponseEntity<>(courseRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity getCourseByUserId(long userId) {
        return new ResponseEntity<>(courseRepository.getAllCourseByUserId(userId),HttpStatus.OK);
    }


}
