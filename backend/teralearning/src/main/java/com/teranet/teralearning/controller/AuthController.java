package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.AuthUser;
import com.teranet.teralearning.service.UserService;
import com.teranet.teralearning.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})

@RequestMapping("/api/auth/")

public class AuthController {

    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private String encryptPassword(String password) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }

    @PostMapping("login")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity login(@RequestBody AuthUser authUser) {
        return userService.authUser(authUser.getUsername(),authUser.getPassword());

    }

    @GetMapping("status")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity get(){
        return new ResponseEntity(HttpStatus.OK);
    }

}

