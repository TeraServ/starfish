package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.model.SimpleMailBody;
import com.teranet.teralearning.service.EmailSenderService;
import com.teranet.teralearning.service.TokenService;
import com.teranet.teralearning.service.UserService;
import com.teranet.teralearning.util.ValueMapper;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;


@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/passwordcontroller")
@NoArgsConstructor
@Slf4j

public class PasswordController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private TokenService tokenService;

    public PasswordController(UserService userService, EmailSenderService emailSenderService, TokenService tokenService) {
        this.userService = userService;
        this.emailSenderService = emailSenderService;
        this.tokenService = tokenService;
    }

    @PostMapping("/forgot_password")
    public ResponseEntity processForgotPassword(HttpServletRequest request, @RequestBody String userEmail){
        try {
            log.info("PasswordController:processForgotPassword Init...");
            if (userService.isUserEmailExists(userEmail)) {
                log.info("PasswordController:processForgotPassword Valid User ");
                userResponseDTO userResponseDTO = ValueMapper.convertToUserDTO(userService.getByUserEmail(userEmail));
                String token = UUID.randomUUID().toString();
                String resetPasswordLink = "/resetpassword?" + "email=" + userResponseDTO.getEmail() + "&token=" + token;
                SimpleMailBody simpleMailBody = new SimpleMailBody();
                simpleMailBody.setRecipient(userResponseDTO.getEmail());
                simpleMailBody.setSubject("Forgot Password");
                simpleMailBody.setMsgBody("Hi, \n" +
                        "A request to rest your password have been received.\n" +
                        "Click the below link  to change your password:\n" +
                        "http://localhost:4200" + resetPasswordLink +
                        "\n" +
                        "This link is valid only for 24 hours.\n" +
                        "Regards,\n" +
                        "Team TeraLearn.");
                tokenService.updateToken(userService.getByUserEmail(userEmail), token);
                return new ResponseEntity(emailSenderService.sendSimpleMail(simpleMailBody), HttpStatus.OK);
            } else {
                log.info("PasswordController:processForgotPassword User Does Not Exist");
                return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException();
        }
    }
    @GetMapping("/reset_password/{email}/{token}")
    public ResponseEntity showResetForm(@PathVariable("token") String token, @PathVariable("email") String email){
        return tokenService.checkTokenValidity(email,token);
    }
    @PostMapping("/reset_account_password")
    public ResponseEntity processResetPassword(HttpServletRequest request,@RequestParam("email")String email,
                                               @RequestParam("token") String token,@RequestParam("password") String newPassword) {
        try {
            StringBuilder message = new StringBuilder("PasswordController:processResetPassword Init...");
            log.info(message.toString());
            if (userService.isUserEmailExists(email)) {
                log.info("PasswordController:processResetPassword Valid User:");
                userResponseDTO userResponseDTO = ValueMapper.convertToUserDTO(userService.getByUserEmail(email));
                if (tokenService.checkTokenValidity(userResponseDTO.getEmail(), token).getStatusCode() == HttpStatus.OK) {
                    log.info("PasswordController:processResetPassword User with valid token");
                    tokenService.clearToken(userService.getByUserEmail(email));
                    userService.updatePassword(userService.getByUserEmail(email), newPassword);
                    SimpleMailBody simpleMailBody = new SimpleMailBody();
                    simpleMailBody.setRecipient(email);
                    simpleMailBody.setSubject("Password Changed Successfully");
                    simpleMailBody.setMsgBody("Hi," + userService.getByUserEmail(email).getFirstName() + "\n" +
                            "We have updated your password. Login with your new password.\n" +
                            "Regards,\n" +
                            "Team TeraLearn.");
                    return new ResponseEntity(emailSenderService.sendSimpleMail(simpleMailBody), HttpStatus.OK);
                } else {
                    log.info("PasswordController:processResetPassword User with expired token");
                    return new ResponseEntity("Invalid/Expired Token", HttpStatus.UNAUTHORIZED);
                }
            } else {
                log.info("PasswordController:processResetPassword User Does Not Exist");
                return new ResponseEntity("User does not exist", HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            log.info("PasswordController:processResetPassword Exception Occurred");
            ex.printStackTrace();
            throw new RuntimeException();
        }
    }

}
