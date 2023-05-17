package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserService extends UserInterface {

    private UserRepository userRepository;

    private UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public ResponseEntity CreateUser(User user){
        return new ResponseEntity(userRepository.save(user), HttpStatus.OK);
    }

    @Override
    public ResponseEntity GetAllUser(){
        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }
}
