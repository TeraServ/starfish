package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.exception.UserNotFoundException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


@Service
public class UserService extends UserInterface {
    private static Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity CreateUser(User user){
        user.setCreatedDate(getDate());
        user.setModifiedDate(getDate());
        user.setPassword(encryptPassword("Password1!"));
        return new ResponseEntity(userRepository.save(user), HttpStatus.OK);
    }

    @Override
    public ResponseEntity GetAllUser(){
        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }

    public List<userResponseDTO> getUserList() throws UserNotFoundException{
        List<userResponseDTO> userResponseDTOS = null;
        try{
            log.debug("UserService:getUserList execution started");
            List<User> users =  userRepository.findAll();
            if(!users.isEmpty()){
              //  userResponseDTOS= users.stream()
                //        .map(ValueMapper::convertToUserEntity).collect(Collectors.toSet());
                return userResponseDTOS;
            }
            else{
                userResponseDTOS = Collections.emptyList();
                return userResponseDTOS;
            }

        } catch(Exception ex){
            log.info("Execution occurred while retrieving user list from database");
            throw new UserNotFoundException("Exception occurred while fetch all users from Database");
        }

    }


    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }

    private String encryptPassword(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return bCryptPasswordEncoder.encode(password);
    }
}
