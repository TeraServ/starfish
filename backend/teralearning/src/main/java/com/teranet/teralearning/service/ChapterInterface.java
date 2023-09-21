package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Chapter;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;


public interface ChapterInterface {
     ResponseEntity addChapter(Chapter chapter);


     ResponseEntity getChaptersById(long id);
}
