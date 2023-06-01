package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;

import com.teranet.teralearning.util.DateUtility;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.exception.UserNotFoundException;


import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@NoArgsConstructor
public class UserService extends UserInterface {
    private static Logger log = LoggerFactory.getLogger(UserService.class);
    private DateUtility dateUtility;
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity CreateUser(User user){
        user.setCreatedDate(dateUtility.getDateTime());
        user.setModifiedDate(dateUtility.getDateTime());
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
                return userResponseDTOS;
            }
            else{
                userResponseDTOS = Collections.emptyList();
                return userResponseDTOS;
            }

        } catch(Exception ex){
            log.error("Execution occurred while retrieving user list from database");
            throw new UserNotFoundException("Exception occurred while fetch all users from Database");
        }

    }
    public void updatePassword(User user, String newPassword){
        try{
            if(user!=null && isUserEmailExists(user.getEmail())){
                user.setPassword(encryptPassword(newPassword));
                //user.setUserStatus(1); Activate Account
                userRepository.save(user);
            }

        }
        catch (Exception ex){
            log.error("UserService:updatePassword: Execution occurred:"+ex);
            throw new UserNotFoundException("Exception occurred while fetch user from Database");
        }
    }
    public boolean isUserEmailExists(String emailID){
        return userRepository.existsByEmail(emailID);
    }
    public User getByUserEmail(String email){
        return userRepository.findByEmail(email);
    }
    public Optional<User> findById(long id){
        return userRepository.findById(id);
    }
    private String encryptPassword(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return bCryptPasswordEncoder.encode(password);
    }
}
