package com.teranet.teralearning.service;

import com.teranet.teralearning.helper.CSVHelper;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;
import com.teranet.teralearning.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.teranet.teralearning.util.DateUtility;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.exception.UserNotFoundException;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Service
@NoArgsConstructor
public class UserService extends UserInterface {
    private static Logger log = LoggerFactory.getLogger(UserService.class);
    private DateUtility dateUtility;
    @Autowired
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private UserDetailsService userDetailsService;


    private UserService(UserRepository userRepository, UserDetailsService userDetailsService,JwtUtil jwtUtil){

        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public ResponseEntity CreateUser(User user){

        Optional<User> u = userRepository.findByUsername(user.getEmail());
        if(u.isPresent()){

            return new ResponseEntity("Email already exists.", HttpStatus.OK);
        }else{
            user.setModifiedDate(getDate());
            user.setCreatedDate(getDate());
            //user.setPassword(encryptPassword(user.getPassword()));
            return new ResponseEntity(userRepository.save(user), HttpStatus.OK);
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

    Object getJson(Object message,String status,String token){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        map.put("token",token);
        return map;
    }
    @Override
    public ResponseEntity authUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if(user.isPresent()){
            if(bCryptPasswordEncoder.matches(password,user.get().getPassword())){

                return new ResponseEntity(getJson(userDetailsService.loadUserByUsername(user.get().getEmail()),"Login Success",jwtUtil.generateToken(username)),HttpStatus.OK);
            }else{
                return new ResponseEntity("Invalid email or password!!",HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity("Invalid email or password!!",HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public ResponseEntity GetAllUser() {
        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }


    @Override
    public ResponseEntity updateUser(User user) {
        Optional<User> updateUser = userRepository.findById(user.getId());
        if (updateUser.isPresent()){

            updateUser.get().setFirstName(user.getFirstName());
            updateUser.get().setLastName(user.getLastName());
            updateUser.get().setPhoneNumber(user.getPhoneNumber());
            updateUser.get().setModifiedDate(getDate());
            updateUser.get().setUserType(user.getUserType());
            updateUser.get().setUserStatus(user.getUserStatus());
            updateUser.get().setStream(user.getStream());
            updateUser.get().setModifiedDate(getDate());
            return new ResponseEntity(userRepository.save(updateUser.get()),HttpStatus.OK);
        }

        return new ResponseEntity("No user found",HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception ex) {
            return new ResponseEntity("Delete failed!!", HttpStatus.OK);
        }
        return new ResponseEntity("Successfully deleted!!", HttpStatus.OK);
    }
    public List<userResponseDTO> getUserList() throws UserNotFoundException{

        List<userResponseDTO> userResponseDTOS = null;
        try {
            log.debug("UserService:getUserList execution started");
            List<User> users = userRepository.findAll();
            if (!users.isEmpty()) {
                return userResponseDTOS;
            } else {
                userResponseDTOS = Collections.emptyList();
                return userResponseDTOS;
            }

        } catch (Exception ex) {
            log.error("Execution occurred while retrieving user list from database");
            throw new UserNotFoundException("Exception occurred while fetch all users from Database");
        }

    }

    public ResponseEntity createMultipleUsers(List<userResponseDTO> userResponseDTOS) {
        log.debug("UserService:createMultipleUsers Init... ");
        try {
            if (!userResponseDTOS.isEmpty()) {
                log.debug("UserService:createMultipleUsers started ");
                int count = 0;
                List<userResponseDTO> preexistentUsers = new ArrayList<>();
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
                for (userResponseDTO dto : userResponseDTOS) {
                    User user = new User();
                    user.setFirstName(dto.getFirstname());
                    user.setLastName(dto.getLastName());
                    user.setEmail(dto.getEmail());
                    user.setPhoneNumber(dto.getPhoneNumber());
                    /*user.setStream(); Mapper for Acronym to Stream*/
                    user.setPassword(bCryptPasswordEncoder.encode("Password1!"));
                    user.setUserType(103);
                    user.setCreatedDate(dateUtility.getDateTime());
                    user.setModifiedDate(dateUtility.getDateTime());
                    if (CreateUser(user).getStatusCode() == HttpStatus.OK) {
                        count++;
                        log.info("UserService:createMultipleUsers User Body created for" + user.getEmail());
                    } else {
                        log.info("UserService:createMultipleUsers User already Exist for" + dto.getEmail());
                        preexistentUsers.add(dto);
                    }
                }
                log.info("UserService:createMultipleUsers terminated");
                /*Notification for Created users and PreexistentUSers*/
                return new ResponseEntity("Multiple user created",HttpStatus.CREATED);

            } else {
                return new ResponseEntity("Blank User List", HttpStatus.BAD_REQUEST);
            }


        } catch (Exception ex) {
            log.error("UserService:createMultipleUsers Exception Occurred");
            throw new UserNotFoundException("Exception occurred while fetch user from Database");

        }
    }
    public void CreateUsersFromCSV(MultipartFile file){
        log.info("UserService:CreateUsersFromCSV Init...");
        try{
            log.info("UserService:CreateUsersFromCSV Started");
            List<User> users = CSVHelper.csvToUser(file.getInputStream());
            userRepository.saveAll(users);
        }
        catch(IOException ex){
            log.info("UserService:CreateUsersFromCSV Exception Occurred"+ex.getMessage());
            throw new RuntimeException("Failed to Store CSV Data"+ex.getMessage());
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

}
