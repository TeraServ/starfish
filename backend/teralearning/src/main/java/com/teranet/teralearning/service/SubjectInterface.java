package com.teranet.teralearning.service;


import com.teranet.teralearning.model.Subject;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SubjectInterface {
    ResponseEntity<Subject> createSubject(Subject subject);
    ResponseEntity<Subject> updateSubjects(long id, Subject subjectDetails);
    List<Subject> getSubjects();
    ResponseEntity deleteSubjectById(long id);
    boolean isSubjectNameExists(String streamName);
}
