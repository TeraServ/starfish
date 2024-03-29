package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter,Long> {
    boolean existsByBodies_QuizList_Id(long id);
    @Query("select c from Chapter c where c.courseId = ?1")
    List<Chapter> findByCourseId(long courseId);

//    @Query("DELETE FROM course_chapters WHERE chapters_id = ?1")
//    void deleteCourseById(long id);
}
