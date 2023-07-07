package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.SoftDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedRecordsRepository extends JpaRepository<SoftDelete, Long> {
    SoftDelete findByRecordId(long recordId);
    SoftDelete findByType(String type);
}
