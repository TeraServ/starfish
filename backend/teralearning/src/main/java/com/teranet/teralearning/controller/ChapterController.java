package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping(value = "/api/course/chapter/")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;
    public ChapterController(ChapterService chapterService){
        this.chapterService = chapterService;
    }
    @PutMapping("new")
    public ResponseEntity newChapter(@RequestBody Chapter chapter){
        return chapterService.addChapter(chapter);
    }

    @DeleteMapping("{id}")
    public ResponseEntity getChapter(@PathVariable("id") long id){
        return chapterService.deleteChapterById(id);
    }


}
