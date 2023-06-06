package com.teranet.teralearning.repository;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
