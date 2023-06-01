package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("select (count(s) > 0) from Subject s where s.subjectName = ?1")
    boolean existsBySubjectName(String subjectName);
}
