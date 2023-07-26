package com.teranet.teralearning.controller;

import com.teranet.teralearning.dto.userResponseDTO;
import com.teranet.teralearning.model.SimpleMailBody;
import com.teranet.teralearning.service.EmailSenderService;
import com.teranet.teralearning.service.TokenService;
import com.teranet.teralearning.service.UserService;
import com.teranet.teralearning.util.ValueMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;


@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/passwordcontroller")
public class PasswordController {
    private UserService userService;
    private EmailSenderService emailSenderService;
    private TokenService tokenService;
    @PostMapping("/forgot_password")
    public ResponseEntity processForgotPassword(HttpServletRequest request, @RequestBody String userEmail){
        if(userService.isUserEmailExists(userEmail)){
            userResponseDTO userResponseDTO = ValueMapper.convertToUserDTO(userService.getByUserEmail(userEmail));
            String token = UUID.randomUUID().toString();
            String resetPasswordLink = "/resetpassword?"+"id="+userResponseDTO.getId()+"&token="+token;
            SimpleMailBody simpleMailBody = new SimpleMailBody();
            simpleMailBody.setRecipient(userResponseDTO.getEmail());
            simpleMailBody.setSubject("Forgot Password");
            simpleMailBody.setMsgBody("Hi, \n" +
                    "A request to rest your password have been recieved.\n" +
                    "Click the below link  to change your password:\n" +
                    "http://localhost:4200" + resetPasswordLink+
                    "\n" +
                    "This link is valid only for 24 hours.\n" +
                    "Regards,\n" +
                    "Team TeraLearn.");
            tokenService.updateToken(userService.getByUserEmail(userEmail),token);
            return new ResponseEntity(emailSenderService.sendSimpleMail(simpleMailBody), HttpStatus.OK);
        }
        else{
            return new ResponseEntity(null,HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/reset_password/{id}/{token}")
    public ResponseEntity showResetForm(@PathVariable("token") String token, @PathVariable("id") long ID){
        return tokenService.checkTokenValidity(ID,token);
    }
    @PostMapping
    public ResponseEntity processResetPassword(HttpServletRequest request,@RequestParam("email")String email,
                                               @RequestParam("token") String token,@RequestParam("password") String newPassword){
        if(userService.isUserEmailExists(email)){
            userResponseDTO userResponseDTO = ValueMapper.convertToUserDTO(userService.getByUserEmail(email));
            if(tokenService.checkTokenValidity(userResponseDTO.getId(),token).getStatusCode()==HttpStatus.OK){
                tokenService.clearToken(userService.getByUserEmail(email));
                userService.updatePassword(userService.getByUserEmail(email),newPassword);
                SimpleMailBody simpleMailBody = new SimpleMailBody();
                simpleMailBody.setRecipient(email);
                simpleMailBody.setSubject("Password Changed Successfully");
                simpleMailBody.setMsgBody("Hi," +userService.getByUserEmail(email).getFirstName()+"\n"+
                        "We have updated your password. Login with your new password.\n" +
                        "Regards,\n" +
                        "Team TeraLearn.");
                return new ResponseEntity(emailSenderService.sendSimpleMail(simpleMailBody), HttpStatus.OK);
            }
            else {
                return new ResponseEntity("Invalid/Expired Token",HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity("User does not exist",HttpStatus.UNAUTHORIZED);
        }
    }

}
