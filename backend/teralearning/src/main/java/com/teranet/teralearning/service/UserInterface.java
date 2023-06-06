package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public abstract class UserInterface {

    protected abstract ResponseEntity CreateUser(User user);

    protected abstract ResponseEntity GetAllUser();
    
   // public Optional<User> getUserById(long id);
}
