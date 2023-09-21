package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile,String> {

}
