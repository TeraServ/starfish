package com.teranet.teralearning.service;

import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.TokenRepository;
import com.teranet.teralearning.util.DateUtility;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Service
public class TokenService implements TokenInterface {
    private TokenRepository tokenRepository;
    private UserService userService;
    private DateUtility dateUtility;

    @Override
    public void updateToken(User user, String token) {
        try {
            log.info("TokenService:updateToken Init...");
            TokenValidity updatedTokenValidity = tokenRepository.findByUser(user);
            if (updatedTokenValidity != null) {
                updatedTokenValidity.setToken(token);
                updatedTokenValidity.setCreatedDate(dateUtility.getDate());
                log.debug("TokenService:updateToken Token of " + user.getFirstName() + "updated to: " + token + "on " + dateUtility.getDateTime());
            } else {
                log.error("TokenService:updateToken User does not exist: Null Token Body");
            }
        } catch (Exception ex) {
            log.error("TokenService:updateToken Exception occurred:"+ex);
        }
    }

    @Override
    public void clearToken(User user) {
        try {
            log.info("TokenService:clearToken Init...");
            TokenValidity clearToken = tokenRepository.findByUser(user);
            if (clearToken != null) {
                clearToken.setToken(null);
                clearToken.setCreatedDate(dateUtility.getDate());
                log.debug("TokenService:clearToken Token of " + user.getFirstName() + "cleared on " + dateUtility.getDateTime());
            } else {
                log.error("TokenService:clearToken Token does not exist");
            }
        } catch (Exception ex) {
            log.error("TokenService:clearToken Exception occurred:"+ex);
        }
    }

    @Override
    public ResponseEntity checkTokenValidity(long ID, String token) {
        try {
            log.info("TokenService:checkTokenValidity Init...");
            Optional<User> user = userService.findById(ID);
            if (user.isPresent()) {
                TokenValidity tokenValidity = tokenRepository.findByUser(user.get());
                if (tokenValidity == null) {
                    log.debug("TokenService:checkTokenValidity Token Does not exit for UserID:" + ID);
                    return new ResponseEntity("No Token Found", HttpStatus.NOT_FOUND);
                } else if (dateUtility.isExpired(tokenValidity.getCreatedDate(), dateUtility.getDate())) {
                    log.debug("TokenService:checkTokenValidity Token Expired for UserID:" + ID);
                    return new ResponseEntity<>("Token Expired", HttpStatus.UNAUTHORIZED);
                } else {
                    if (tokenValidity.getToken() != null && tokenValidity.getToken().equals(token)) {
                        log.debug("TokenService:checkTokenValidity Valid Reset Token from UserID:" + ID);
                        return new ResponseEntity("Valid Reset Token", HttpStatus.OK);
                    } else {
                        log.debug("TokenService:checkTokenValidity Invalid Reset Token from UserID:" + ID);
                        log.error("TokenService:checkTokenValidity Token does not match. Invalid Token:" + tokenValidity.getToken());
                        return new ResponseEntity("Invalid Reset Token", HttpStatus.NOT_FOUND);
                    }
                }
            } else {
                log.error("TokenService:checkTokenValidity User Not found");
                return new ResponseEntity("User Not Found!", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            log.error("TokenService:checkTokenValidity Exception occurred:"+ex);
            return null;
        }
    }


}
