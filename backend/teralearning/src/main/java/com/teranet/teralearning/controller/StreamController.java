package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.service.StreamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/stream/")
public class StreamController {
    private StreamService streamService;
    public StreamController(StreamService streamService){
        this.streamService = streamService;
    }


    @PostMapping("new")
    public ResponseEntity newStream(@RequestBody Stream stream){
        return streamService.createStream(stream);
    }

    @GetMapping("list")
    public ResponseEntity getStream(){
        return new ResponseEntity(streamService.getStreams(), HttpStatus.OK);
    }

//    @GetMapping("sorted")
//    public List<Stream> getSortedStreams(){
//        List<Stream> streams = streamService.getAllStreams();
//        streams.sort(Comparator.comparing(Stream::getStreamName));
//        return streams;
//    }



    @PutMapping("update/{id}")
    public ResponseEntity<Stream> updateStream(@PathVariable long id, @RequestBody Stream streamDetails){
        return streamService.updateStream(id,streamDetails);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Stream> deleteStream(@PathVariable long id){

        return streamService.deleteStreamById(id);
    }
}
