package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.model.Course;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping(value = "/api/course/")
public class CourseController {

    @Autowired
    private CourseService courseService;
    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("new")
    public ResponseEntity newCourse(@RequestBody Course course){

        return courseService.addCourse(course);
    }
    @GetMapping("list")
    public ResponseEntity getAll(){
        return courseService.getAllCourse();
    }

    @GetMapping("list/{id}")
    public ResponseEntity getAllByUserId(@PathVariable("id") long userId){
        return courseService.getCourseByUserId(userId);
    }


}
