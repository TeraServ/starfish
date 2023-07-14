package com.teranet.teralearning.service;

import com.teranet.teralearning.helper.CSVHelper;
import com.teranet.teralearning.model.SimpleMailBody;
import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.TokenRepository;
import com.teranet.teralearning.repository.UserRepository;
import com.teranet.teralearning.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
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
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

import java.time.LocalDateTime;


@Service
@NoArgsConstructor
public class UserService extends UserInterface {
    private static Logger log = LoggerFactory.getLogger(UserService.class);
    private DateUtility dateUtility;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private DeletedRecordsService deletedRecordsService;


    public UserService(DateUtility dateUtility, JavaMailSender javaMailSender,UserRepository userRepository, TokenRepository tokenRepository, JwtUtil jwtUtil, UserDetailsService userDetailsService, DeletedRecordsService deletedRecordsService) {
        this.dateUtility = dateUtility;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.deletedRecordsService = deletedRecordsService;
        this.javaMailSender = javaMailSender;
        
    }

    @Override
    public ResponseEntity CreateUser(User user){

        Optional<User> u = userRepository.findByEmail(user.getEmail());
        if(u.isPresent()){

            return new ResponseEntity("Email already exists.", HttpStatus.CONFLICT);
        }else{
            user.setModifiedDate(getDate());
            user.setCreatedDate(getDate());
            user.setPassword(encryptPassword(user.getPassword()));
            String token = UUID.randomUUID().toString();
            addToken(user,token);
            /*sendWelcomeMail(user,token);*/
            return new ResponseEntity(userRepository.save(user), HttpStatus.OK);
        }

    }
    private LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        return LocalDateTime.now();
    }
    private LocalDate getDateOnly(){
        return LocalDate.now();
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
            if(user.get().getUserStatus() == 102){
                user.get().setUserStatus(101);
            }else if(user.get().getUserStatus() == 103){
                return new ResponseEntity("Access denied!",HttpStatus.NOT_FOUND);
            }
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
    /*    userRepository.findAll().stream()
                .forEach(user -> {
                    deletedRecordsService.checkDeletionDate(user.getClass().getSimpleName(),user.getId());
                });*/
        userRepository.findAll().stream()
                .forEach(user->{
                    deletedRecordsService.checkDeletionDate(user.getClass().getSimpleName(), user.getId());
                });
        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }


    @Override
    public Optional<User> getUserById(long id){
        return userRepository.findById(id);
    }

    public void FilterUsers(){

    }

    @Override
    public ResponseEntity updateUser(User user) {
        Optional<User> updateUser = userRepository.findById(user.getId());
        if (updateUser.isPresent()){
            if(user.getUserStatus()==102){
                return deleteUser(user.getId());
            }
            else if (user.getUserStatus()==101){
                updateUser.get().setFirstName(user.getFirstName());
                updateUser.get().setLastName(user.getLastName());
                updateUser.get().setPhoneNumber(user.getPhoneNumber());
                updateUser.get().setModifiedDate(getDate());
                updateUser.get().setUserType(user.getUserType());
                updateUser.get().setUserStatus(user.getUserStatus());
                updateUser.get().setStream(user.getStream());
                updateUser.get().setModifiedDate(getDate());
                deletedRecordsService.clearDeletionRecord(updateUser.getClass().getSimpleName(), user.getId());
                return new ResponseEntity(userRepository.save(updateUser.get()),HttpStatus.OK);
            }
            else {

            }


        }

        return new ResponseEntity("No user found",HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity deleteUser(Long id) {
        try {
            log.debug("UserService:deleteUser Init...");
            Optional<User> deletedUser = userRepository.findById(id);
            if(deletedUser.isPresent()){
                deletedUser.get().setUserStatus(102);
                deletedRecordsService.deleteUserBody(userRepository.findById(id).get());
                userRepository.save(deletedUser.get());
                log.info("UserService:deleteUser User found and status changed to suspended with id:"+id);
                /*userRepository.deleteById(id);*/
                return new ResponseEntity("Successfully deleted!!", HttpStatus.OK);
            }
            else {
                log.error("UserService:deleteUser User not found where id:"+id);
                return new ResponseEntity("User not Found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            log.error("UserService:deleteUser Exception occurred:"+ex);
            return new ResponseEntity("Deletion failed", HttpStatus.OK);
        }
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

    public ResponseEntity createMultipleUsers(List<User> userList) {
        try {
            if (!userList.isEmpty()) {
                log.debug("UserService:createMultipleUsers Init... ");
                int userCount = 0;
                List<User> preExistentUsers = new ArrayList<>();
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
                for (User user : userList) {
                    user.setPassword("Password1!");
                    user.setUserType(103);
                    if (CreateUser(user).getStatusCode() == HttpStatus.OK) {
                        userCount++;
                        log.info("UserService:createMultipleUsers User Body created for" + user.getEmail());
                    } else {
                        log.info("UserService:createMultipleUsers User already Exist for" + user.getEmail());
                        preExistentUsers.add(user);
                    }
                }
                log.info("UserService:createMultipleUsers - terminated");
                /*Notification for Created users and PreexistentUsers*/
                return new ResponseEntity("Multiple user created",HttpStatus.CREATED);

            } else {
                return new ResponseEntity("Blank User List", HttpStatus.BAD_REQUEST);
            }


        } catch (Exception ex) {
            log.error("UserService:createMultipleUsers - Exception Occurred:");
            ex.printStackTrace();
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
            log.info("UserService:CreateUsersFromCSV - Exception Occurred"+ex.getMessage());
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
            log.error("UserService:updatePassword: - Execution occurred:"+ex);
            ex.printStackTrace();
            throw new UserNotFoundException("Exception occurred while fetch user from Database");
        }
    }
    public String permanentDelete(long id){
        try{
            log.debug("UserService:permanentDelete Init...");
            Optional<User> permanentDeletedUser = userRepository.findById(id);
            if(permanentDeletedUser.isPresent()){
                tokenRepository.deleteByUser(permanentDeletedUser.get());

                userRepository.deleteById(id);
                return "Success";
            }
            else {
                return "User not Found: Failed to Delete User";
            }
        }
        catch (Exception ex){
            log.error("UserService:permanentDelete Exception Occurred:"+ex);
            ex.printStackTrace();
            return "Exception Occurred: Failed to Delete User";
        }
    }

    public void addToken (User user, String token){
        try {
            log.info("UserService:addToken Init...");
            TokenValidity tokenValidity = new TokenValidity();
            tokenValidity.setUser(user);
            tokenValidity.setToken(token);
            tokenValidity.setCreatedDate(getDateOnly());
            tokenRepository.save(tokenValidity);
        }catch (Exception ex){
            log.info("UserService:addToken Exception Occurred:"+ex);
            ex.printStackTrace();
        }
    }
    public void sendWelcomeMail(User user, String token){
        try {
            log.info("UserService:sendWelcomeMail Init...");
            SimpleMailBody simpleMailBody = new SimpleMailBody();
            String resetPasswordLink = "http://localhost:4200/reset_password?email=" + user.getEmail() + "&token=" + token;
            simpleMailBody.setRecipient(user.getEmail());
            simpleMailBody.setSubject("Welcome to Tera Learning | ABC Institute ");
            simpleMailBody.setMsgBody("Hi," + user.getFirstName() +
                    "\nWelcome to ABC Institute's Learning Management System, a Profile was created with your email.\n" +
                    "Login Email: " + user.getEmail() +
                    "\nKindly change your password at: " + resetPasswordLink +
                    "\n" +
                    "The Link is valid only for 24 hours.\n" +
                    "Regards, \n\n" +
                    "Team TeraLearn");
            Thread th = new EmailSenderService(javaMailSender,simpleMailBody);
            th.start();
        }catch (Exception ex){
            log.error(String.format("UserService:sendWelcomeMail Exception Occurred:{ex})"));
            ex.printStackTrace();
        }
    }

    public boolean isUserEmailExists(String emailID){
        return userRepository.existsByEmail(emailID);
    }
    public User getByUserEmail(String email){
        return userRepository.findByEmail(email).get();
    }
    public Optional<User> findById(long id){
        return userRepository.findById(id);
    }

//    public List<User> getEntitiesByStreamName(Stream stream) {
//        return userRepository.findByStream(stream);
//    }

}
