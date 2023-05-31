package com.teranet.teralearning.controller;


import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/")
public class UserController {

    private UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("new")
    public ResponseEntity newUser(@RequestBody User user){
        return userService.CreateUser(user);
    }
    @GetMapping("list")
    public ResponseEntity getUser(){
        return new ResponseEntity(userService.GetAllUser(),HttpStatus.OK);
    }


}
