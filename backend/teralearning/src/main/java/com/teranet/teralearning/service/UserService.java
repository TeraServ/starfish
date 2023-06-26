package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;
import com.teranet.teralearning.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
public class UserService extends UserInterface {

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
        Optional<User> u = userRepository.findByEmail(user.getEmail());
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
        Optional<User> user = userRepository.findByEmail(username);

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
    public ResponseEntity GetAllUser(){
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
        try{
            userRepository.deleteById(id);
        }catch (Exception ex){
            return new ResponseEntity("Delete failed!!",HttpStatus.OK);
        }
        return new ResponseEntity("Successfully deleted!!",HttpStatus.OK);
    }
}
