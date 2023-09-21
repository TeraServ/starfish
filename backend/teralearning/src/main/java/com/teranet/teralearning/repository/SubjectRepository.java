package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {


    @Query("select (count(s) > 0) from Subject s where s.subjectName = ?1")
    boolean existsBySubjectName(String subjectName);

    @Query("select s from Subject s where s.stream.Id = ?1")
    List<Subject> findSubjectByStream(long Id);

}
