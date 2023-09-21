package com.teranet.teralearning.service;

import com.teranet.teralearning.model.ImageFile;
import com.teranet.teralearning.repository.ImageFileRepository;
import org.apache.juli.logging.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


@Service
public class ImageFileService {
    private ImageFileRepository imageFileRepository;

    public ImageFileService(ImageFileRepository imageFileRepository){
        this.imageFileRepository = imageFileRepository;
    }
    public ResponseEntity saveImage(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        System.out.println(fileName+" "+file.getContentType().toString());
        ImageFile imageFile = new ImageFile(file.getContentType(),fileName,file.getBytes());

        return new ResponseEntity(imageFileRepository.save(imageFile), HttpStatus.OK);
    }

    public ResponseEntity getImageById(String id){
        Optional<ImageFile> imageFile = imageFileRepository.findById(id);
        if(imageFile.isPresent()){
            return new ResponseEntity(imageFile.get().getData(),HttpStatus.OK);
        }else{
            return new ResponseEntity("No image found with id: "+id,HttpStatus.NOT_FOUND);
        }
    }

}
