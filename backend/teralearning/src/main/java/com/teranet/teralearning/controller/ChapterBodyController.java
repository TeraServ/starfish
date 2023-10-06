package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.ChapterBody;
import com.teranet.teralearning.service.ChapterDataService;
import io.netty.handler.codec.http.HttpResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/chapterBody/")
public class ChapterBodyController {
    private ChapterDataService chapterDataService;

    
    public ChapterBodyController(ChapterDataService chapterDataService){
        this.chapterDataService = chapterDataService;
    }
    @PostMapping("{id}/new")
    public ResponseEntity addBody(@PathVariable("id") long id, @RequestBody ChapterBody body){


       return chapterDataService.createChapter(id,body);
    }
    @GetMapping("{id}/all")
    public ResponseEntity addBody(@PathVariable("id") long id){


        return chapterDataService.getAllChapterData(id);
    }
}
