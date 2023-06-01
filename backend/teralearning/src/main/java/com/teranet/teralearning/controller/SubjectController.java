package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Subject;
import com.teranet.teralearning.service.StreamService;
import com.teranet.teralearning.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subject/")
@Validated
public class SubjectController {
    private SubjectService subjectService;

    public SubjectController(SubjectService subjectService){
        this.subjectService = subjectService;
    }
    @PostMapping("new")
    public ResponseEntity newSubject(@RequestBody Subject subject ){
        return subjectService.createSubject(subject);
    }

    @GetMapping("list")
    public ResponseEntity getSubject(){
        return new ResponseEntity(subjectService.getSubjects(), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable long id, @RequestBody Subject subjectDetails){
        return subjectService.updateSubjects(id,subjectDetails);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Stream> deleteSubject(@PathVariable long id){

        return subjectService.deleteSubjectById(id);
    }
}
