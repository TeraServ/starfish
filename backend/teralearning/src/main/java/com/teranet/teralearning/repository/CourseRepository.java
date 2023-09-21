package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Course;
import com.teranet.teralearning.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("Select c from Course c where c.createdBy = ?1")
    List<Course> getAllCourseByUserId(long Id);
}
