package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public abstract class UserInterface {

    protected abstract ResponseEntity CreateUser(User user);

    public abstract ResponseEntity authUser(String username, String password);

    protected abstract ResponseEntity GetAllUser();


    public abstract Optional<User> getUserById(long id);

    public abstract ResponseEntity updateUser(User user);

    public abstract ResponseEntity deleteUser(Long id);

}
