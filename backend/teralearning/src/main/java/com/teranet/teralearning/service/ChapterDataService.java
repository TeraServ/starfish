package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.model.ChapterBody;
import com.teranet.teralearning.repository.ChapterDataRepository;
import com.teranet.teralearning.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChapterDataService implements ChapterDataServiceInterface {
    @Autowired
    private ChapterDataRepository chapterDataRepository;
    @Autowired
    private ChapterRepository chapterRepository;
    public ChapterDataService(ChapterDataRepository chapterDataRepository,ChapterRepository chapterRepository){
        this.chapterDataRepository = chapterDataRepository;
        this.chapterRepository = chapterRepository;
    }
    public ResponseEntity createChapter(long id,ChapterBody body){
       Optional<Chapter> chapter  = chapterRepository.findById(id);
       if(chapter.isPresent()){
//           body.setChapter(chapter.get());
           return new ResponseEntity(chapterDataRepository.save(body), HttpStatus.OK);
       }else{
           return new ResponseEntity(HttpStatus.NOT_FOUND);
       }

    }


    @Override
    public ResponseEntity getAllChapterData(long id) {
        return new ResponseEntity<>(chapterDataRepository.findById(id),HttpStatus.OK);
    }
}
