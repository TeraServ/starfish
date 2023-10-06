package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.ChapterBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterDataRepository extends JpaRepository<ChapterBody,Long> {
}
