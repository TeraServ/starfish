package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import org.springframework.http.ResponseEntity;

public interface TokenInterface {
    void updateToken(User user, String token);
    void clearToken(User user);
    ResponseEntity checkTokenValidity(String email, String token);
}
