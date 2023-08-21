package com.teranet.teralearning.controller;

import com.teranet.teralearning.service.ImageFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping(value = "/api/file/")
public class ImageController {

    @Autowired
    private ImageFileService imageFileService;

    public ImageController(){}
    public ImageController(ImageFileService imageFileService){
        this.imageFileService = imageFileService;
    }

    @PostMapping("coverImage")
    public ResponseEntity UploadCover(@RequestParam("file") MultipartFile file){
       if(!file.isEmpty()){
           try{
               System.out.println(file.getOriginalFilename());
               return imageFileService.saveImage(file);
           }catch (Exception e){
               System.out.println(e);
               return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
           }
       }else{
           return new ResponseEntity("No file found",HttpStatus.NOT_FOUND);
       }

    }

    @GetMapping("image/{id}")
    public ResponseEntity getImageById(@PathVariable("id") String id){
        return imageFileService.getImageById(id);
    }


}
