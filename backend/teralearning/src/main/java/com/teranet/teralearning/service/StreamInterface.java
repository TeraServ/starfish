package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Stream;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StreamInterface {
    ResponseEntity<Stream> createStream(Stream stream);
    ResponseEntity<Stream> updateStream(long id, Stream streamDetails);
    List<Stream> getStreams();
    ResponseEntity deleteStreamById(long id);
    boolean isStreamNameExists(String streamName);

    }
