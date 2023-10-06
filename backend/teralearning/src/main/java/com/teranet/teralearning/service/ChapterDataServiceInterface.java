package com.teranet.teralearning.service;

import com.teranet.teralearning.model.ChapterBody;
import org.springframework.http.ResponseEntity;

public interface ChapterDataServiceInterface {
    ResponseEntity createChapter(long id,ChapterBody body);

    ResponseEntity getAllChapterData(long id);
}
