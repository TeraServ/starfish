package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.repository.StreamRepository;
import com.teranet.teralearning.repository.SubjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubjectService implements SubjectInterface{
    private SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }

    public LocalDateTime getDateTime(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }

    @Override
    public boolean isSubjectNameExists(String subjectName){
        return subjectRepository.existsBySubjectName(subjectName);
    }
    @Override
    public ResponseEntity createSubject(Subject subject){

        if (!isSubjectNameExists(subject.getSubjectName())) {
            subject.setCreatedDate(getDateTime());
            subject.setModifiedDate(getDateTime());
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
            updateSubject.setStream((subjectDetails.getStream()));
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

    public ResponseEntity getSubjectByStream(long streamId){

        return new ResponseEntity(subjectRepository.findSubjectByStream(streamId),HttpStatus.OK);
    }
}
