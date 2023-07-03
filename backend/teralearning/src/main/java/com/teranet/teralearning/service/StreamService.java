package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.repository.StreamRepository;
import com.teranet.teralearning.util.DateUtility;
import lombok.NoArgsConstructor;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class StreamService implements StreamInterface{

    @Autowired
    private StreamRepository streamRepository;
    @Autowired
    private DeletedRecordsService deletedRecordsService;


    public StreamService(StreamRepository streamRepository, DeletedRecordsService deletedRecordsService) {
        this.streamRepository = streamRepository;
        this.deletedRecordsService = deletedRecordsService;
    }

    public LocalDateTime getDateTime(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }

    @Override
    public boolean isStreamNameExists(String streamName){
        return streamRepository.existsByStreamName(streamName);
    }
    @Override
    public ResponseEntity createStream(Stream stream){

        if (!isStreamNameExists(stream.getStreamName()) && !streamRepository.existsById(stream.getId())) {
            stream.setCreatedDate(getDateTime());
            stream.setModifiedDate(getDateTime());
        return new ResponseEntity(streamRepository.save(stream), HttpStatus.OK);
    }
    else{
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    }

    @Override
    public List<Stream> getStreams() {
        return streamRepository.findAll();
    }
    @Override
    public ResponseEntity updateStream(long id, Stream streamDetails){

        Stream updateStream = streamRepository.getReferenceById(id);
        if(streamRepository.existsById(id)){

            updateStream.setStreamName((streamDetails.getStreamName()));
            updateStream.setStreamStatus((streamDetails.getStreamStatus()));
            updateStream.setAcronym((streamDetails.getAcronym()));
            updateStream.setPrice((streamDetails.getPrice()));
            updateStream.setDiscount((streamDetails.getDiscount()));
            return new ResponseEntity<>(streamRepository.save(updateStream),HttpStatus.OK);

        }
        else {
            return null;
        }

    }
    public ResponseEntity deleteStreamById(long id){
        if(streamRepository.existsById(id)){
            Stream deletedStream = streamRepository.getReferenceById(id);
            deletedRecordsService.deleteStreamBody(deletedStream);
            streamRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return null;
        }
    }

}
