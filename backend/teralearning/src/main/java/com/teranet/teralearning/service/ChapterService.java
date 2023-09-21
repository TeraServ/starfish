package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Chapter;
import com.teranet.teralearning.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChapterService implements ChapterInterface {

    @Autowired
    private ChapterRepository chapterRepository;
    public ChapterService(ChapterRepository chapterRepository){
        this.chapterRepository = chapterRepository;
    }
    @Override
    public ResponseEntity addChapter(Chapter chapter) {
        Optional<Chapter> ch  = chapterRepository.findById(chapter.getId());
        if(ch.isPresent()){
            ch.get().setChapterName(chapter.getChapterName());
            ch.get().setPages(chapter.getPages());

            return new ResponseEntity(chapterRepository.save(ch.get()),HttpStatus.OK);
        }else {
            return new ResponseEntity(chapterRepository.save(chapter), HttpStatus.OK);
        }

    }
    @Override
    public ResponseEntity getChaptersById(long id) {
        return new ResponseEntity(chapterRepository.findByCourseId(id), HttpStatus.OK);
    }
}
