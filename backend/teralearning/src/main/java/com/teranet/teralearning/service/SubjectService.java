package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.repository.StreamRepository;
import com.teranet.teralearning.repository.SubjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService implements SubjectInterface{
    private SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }
    @Override
    public boolean isSubjectNameExists(String subjectName){
        return subjectRepository.existsBySubjectName(subjectName);
    }
    @Override
    public ResponseEntity createSubject(Subject subject){

        if (!isSubjectNameExists(subject.getSubjectName())) {
            return new ResponseEntity(subjectRepository.save(subject), HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }
    @Override
    public ResponseEntity updateSubjects(long id, Subject subjectDetails){

        Subject updateSubject = subjectRepository.getReferenceById(id);
        if(subjectRepository.existsById(id)){

            updateSubject.setSubjectName((subjectDetails.getSubjectName()));
            updateSubject.setStreamName((subjectDetails.getStreamName()));
            updateSubject.setSubjectStatus(subjectDetails.getSubjectStatus());
            updateSubject.setCreatedDate((subjectDetails.getCreatedDate()));
            updateSubject.setModifiedDate((subjectDetails.getModifiedDate()));
            return new ResponseEntity<>(subjectRepository.save(updateSubject),HttpStatus.OK);

        }
        else {
            return null;
        }

    }
    public ResponseEntity deleteSubjectById(long id){
        if(subjectRepository.existsById(id)){
            subjectRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return null;
        }
    }
}
