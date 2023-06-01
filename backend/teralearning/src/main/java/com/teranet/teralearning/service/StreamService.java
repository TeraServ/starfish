package com.teranet.teralearning.service;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.repository.StreamRepository;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreamService implements StreamInterface{

    private StreamRepository streamRepository;
    public StreamService(StreamRepository streamRepository){
        this.streamRepository = streamRepository;
    }


    @Override
    public boolean isStreamNameExists(String streamName){
        return streamRepository.existsByStreamName(streamName);
    }
    @Override
    public ResponseEntity createStream(Stream stream){

        if (!isStreamNameExists(stream.getStreamName()) && !streamRepository.existsById(stream.getId())) {
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
            streamRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return null;
        }
    }

}
