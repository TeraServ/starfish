package com.teranet.teralearning.service;

import com.teranet.teralearning.exception.InternalStandardError;
import com.teranet.teralearning.model.Notification;
import com.teranet.teralearning.model.SimpleMailBody;
import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.NotificationRepository;
import com.teranet.teralearning.repository.TokenRepository;
import com.teranet.teralearning.repository.UserRepository;
import com.teranet.teralearning.util.JwtUtil;
import lombok.AllArgsConstructor;
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
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

import java.time.LocalDateTime;
import java.util.stream.Stream;


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
    private NotificationRepository notificationRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private DeletedRecordsService deletedRecordsService;

    public UserService(DateUtility dateUtility, JavaMailSender javaMailSender, UserRepository userRepository, TokenRepository tokenRepository, NotificationRepository notificationRepository, JwtUtil jwtUtil, UserDetailsService userDetailsService, DeletedRecordsService deletedRecordsService) {
        this.dateUtility = dateUtility;
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.notificationRepository = notificationRepository;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.deletedRecordsService = deletedRecordsService;
    }

    @Override
    public ResponseEntity CreateUser(User user){

        Optional<User> u = userRepository.findByEmail(user.getEmail());
        System.out.println("user body:" + user);
        if(u.isPresent()){
            return new ResponseEntity(InternalStandardError.USER_ALREADY_EXIST.getErrorMessage(),InternalStandardError.USER_ALREADY_EXIST.getHttpStatus());

       /*     return new ResponseEntity("Email already exists.", HttpStatus.CONFLICT);*/
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
                log.info(jwtUtil.generateToken(username));

                return new ResponseEntity(getJson(userDetailsService.loadUserByUsername(user.get().getEmail()),InternalStandardError.LOGIN_SUCCESSFULLY.getErrorMessage(), jwtUtil.generateToken(username)),InternalStandardError.LOGIN_SUCCESSFULLY.getHttpStatus());
            }else{
                return new ResponseEntity(InternalStandardError.INVALID_EMAIL_OR_PASSWORD.getErrorMessage(),InternalStandardError.INVALID_EMAIL_OR_PASSWORD.getHttpStatus());
            }
        }else{
            return new ResponseEntity(InternalStandardError.INVALID_EMAIL_OR_PASSWORD.getErrorMessage(),InternalStandardError.INVALID_EMAIL_OR_PASSWORD.getHttpStatus());
        }
    }
    @Override
    public ResponseEntity GetAllUser() {

        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }
    public Flux<User> loadAllUserStream(){
        long start = System.currentTimeMillis();
        Flux<User> users = Flux.fromIterable(userRepository.findAll());
        long end = System.currentTimeMillis();
        System.out.println("Total Execution time:"+(end-start));
        return users;
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
                userRepository.save(updateUser.get());
                return new ResponseEntity(InternalStandardError.UPDATED_SUCCESSFULLY.getErrorMessage(),InternalStandardError.UPDATED_SUCCESSFULLY.getHttpStatus());
            }
            else {

            }


        }

        return new ResponseEntity(InternalStandardError.USER_NOT_FOUND.getErrorMessage(),InternalStandardError.USER_NOT_FOUND.getHttpStatus());
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
                return new ResponseEntity(InternalStandardError.RECORD_DELETED.getErrorMessage(),InternalStandardError.RECORD_DELETED.getHttpStatus());
            }
            else {
                log.error("UserService:deleteUser User not found where id:"+id);
                return new ResponseEntity(InternalStandardError.USER_NOT_FOUND.getErrorMessage(),InternalStandardError.USER_NOT_FOUND.getHttpStatus());
            }
        } catch (Exception ex) {
            log.error("UserService:deleteUser Exception occurred:"+ex);
            ex.printStackTrace();
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
                        log.info("UserService:createMultipleUsers User Body created for:" + user.getEmail());
                    } else {
                        log.info("UserService:createMultipleUsers User already Exist for:" + user.getEmail());
                        preExistentUsers.add(user);
                    }
                }
                log.info("UserService:createMultipleUsers Notification Report Generated:"+createNotificationForBulkUserGeneration(userCount, preExistentUsers));
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
    public boolean createNotificationForBulkUserGeneration(int userCount, List<User> userList){
        log.info("UserService:createNotification Init...");
        Notification notification = new Notification();
        notification.setTitle("Bulk User Creation - Status");
        notification.setBody("Total no:of successful user created:"+userCount +
                "\n  Unsuccessful User Details: "+ userList.toString());
        notification.setCreatedDate(getDate());
        notification.setModifiedDate(getDate());
        if(notificationRepository.save(notification).getBody() == notification.getBody()){
            return true;
        }
        else {
            return false;
        }
    }
    public void updatePassword(User user, String newPassword){
        try{
            if(user!=null && isUserEmailExists(user.getEmail())){
                log.info("UserService:updatePassword Init...");
                if(user.getUserStatus() == 102){
                    log.info("UserService:updatePassword User found to be suspended. Cannot change password");
                } else if (user.getUserStatus() == 103 && isPasswordStrong(newPassword)) {
                    log.info("UserService:updatePassword User account activated");
                    user.setUserStatus(101);
                    user.setPassword(encryptPassword(newPassword));
                    userRepository.save(user);
                }
                else {
                    if(!isPasswordStrong(newPassword)){
                        log.info("UserService:updatePassword Not a Strong Password for "+user.getEmail());
                    }
                    log.info("UserService:updatePassword Password Changed for "+user.getEmail());
                    user.setPassword(encryptPassword(newPassword));
                    userRepository.save(user);
                }
                //user.setUserStatus(1); Activate Account
            }

        }
        catch (Exception ex){
            log.error("UserService:updatePassword: - Execution occurred:"+ex);
            ex.printStackTrace();
            throw new UserNotFoundException("Exception occurred while fetch user from Database");
        }
    }
    public void accessDeleteMethod(long id){
        permanentDelete(id);
    }
    private void permanentDelete(long id){
        try{
            log.debug("UserService:permanentDelete Init...");
            Optional<User> permanentDeletedUser = userRepository.findById(id);
            if(permanentDeletedUser.isPresent()){
                tokenRepository.deleteByUser(permanentDeletedUser.get());

                userRepository.deleteById(id);
                System.out.println( "UserService:permanentDelete Success");
            }
            else {
                System.out.println("UserService:permanentDelete User not Found: Failed to Delete User");
            }
        }
        catch (Exception ex){
            log.error("UserService:permanentDelete Exception Occurred:"+ex);
            ex.printStackTrace();
            System.out.println("UserService:permanentDelete Exception Occurred: Failed to Delete User");
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
            log.info(String.format("UserService:sendWelcomeMail Exception Occurred:{ex})"));
            ex.printStackTrace();
        }
    }
    public boolean
    isPasswordStrong(String password){
        return password.length() > 6
                && password.matches(".*//d.*")
                && password.matches(".*[a-z].*")
                && password.matches(".*[A-Z].*");
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
