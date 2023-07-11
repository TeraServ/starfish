package com.teranet.teralearning.controller;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.service.UserService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/user/")
@OpenAPIDefinition(info = @Info(title = "TeraLearn API", version = "2.0", description = "TeraLearn API documentation"))
@SecurityScheme(name = "user-authenticate", scheme = "bearer", type = SecuritySchemeType.HTTP,bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping("new")
    public ResponseEntity newUser(@RequestBody User user){
      return userService.CreateUser(user);
    }
    @PostMapping("create_bulk_user")
    public ResponseEntity createBulkUser(@RequestBody List<User> userList){
        return userService.createMultipleUsers(userList);
    }

    @PutMapping("update")
    public ResponseEntity updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

    @CrossOrigin("http://localhost:4200/")
    @GetMapping("list")
    public ResponseEntity getUser(){
        return userService.GetAllUser();
    }

//    @CrossOrigin("http://localhost:4200/")
//    @GetMapping("flist/{stream}")
//    public ResponseEntity getFilteredUser(@PathVariable Stream stream){
//        return new ResponseEntity(userService.getEntitiesByStreamName(stream), HttpStatus.OK);
//    }

    @CrossOrigin("http://localhost:4200/")
    @GetMapping(value = "{id}")
    public Optional<User> getUserById(@PathVariable long id)
    {
        return userService.getUserById(id);
    }




}
