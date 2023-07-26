package com.teranet.teralearning.service;

import com.teranet.teralearning.exception.InternalStandardError;
import com.teranet.teralearning.model.TokenValidity;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.TokenRepository;
import com.teranet.teralearning.util.DateUtility;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Service
public class TokenService implements TokenInterface {
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    @Lazy
    private UserService userService;
    @Autowired
    private DateUtility dateUtility;

    @Override
    public void updateToken(User user, String token) {
        try {
            log.info("TokenService:updateToken Init...");
            TokenValidity updatedTokenValidity = tokenRepository.findByUser(user);
            if (updatedTokenValidity != null) {
                updatedTokenValidity.setToken(token);
                updatedTokenValidity.setCreatedDate(dateUtility.getDate());
                tokenRepository.save(updatedTokenValidity);
                log.info("TokenService:updateToken Token of " + user.getFirstName() + " updated to: " + token + "on " + dateUtility.getDateTime());
            } else {
                log.info("TokenService:updateToken User does not exist: Null Token Body");
            }
        } catch (Exception ex) {
            log.info("TokenService:updateToken Exception occurred:"+ex);
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
                tokenRepository.save(clearToken);
                log.debug("TokenService:clearToken Token of " + user.getFirstName() + "cleared on " + dateUtility.getDateTime());
            } else {
                log.error("TokenService:clearToken Token does not exist");
            }
        } catch (Exception ex) {
            log.error("TokenService:clearToken Exception occurred:"+ex);
        }
    }

    @Override
    public ResponseEntity checkTokenValidity(String email, String token) {
        try {
            log.info("TokenService:checkTokenValidity Init... ");
            if (userService.isUserEmailExists(email)) {
                User user = userService.getByUserEmail(email);
                TokenValidity tokenValidity = tokenRepository.findByUser(user);
                if (tokenValidity == null) {
                    log.info("TokenService:checkTokenValidity Token Does not exit for Email:" +email);
                    return new ResponseEntity("No Token Found", HttpStatus.NOT_FOUND);
                } else if (dateUtility.isExpired(tokenValidity.getCreatedDate(), dateUtility.getDate())) {
                    log.info("TokenService:checkTokenValidity Token Expired for Email:" + email);
                    return new ResponseEntity<>(InternalStandardError.TOKEN_EXPIRED.getErrorMessage(),InternalStandardError.TOKEN_EXPIRED.getHttpStatus());
                } else {
                    if (tokenValidity.getToken() != null && tokenValidity.getToken().equals(token)) {
                        log.info("TokenService:checkTokenValidity Valid Reset Token from Email:" + email);
                        return new ResponseEntity<>(InternalStandardError.TOKEN_VALID.getErrorMessage(), InternalStandardError.TOKEN_VALID.getHttpStatus());
                    } else {
                        log.info("TokenService:checkTokenValidity Invalid Reset Token from Email:" + email);
                        log.info("TokenService:checkTokenValidity Token does not match. Invalid Token:" + token);
                        return new ResponseEntity<>(InternalStandardError.TOKEN_INVALID.getErrorMessage(),InternalStandardError.TOKEN_INVALID.getHttpStatus());
                    }
                }
            } else {
                log.info("TokenService:checkTokenValidity User Not found");
                return new ResponseEntity(InternalStandardError.USER_NOT_FOUND.getErrorMessage(), InternalStandardError.USER_NOT_FOUND.getHttpStatus());
            }
        } catch (Exception ex) {
            log.error("TokenService:checkTokenValidity Exception occurred:"+ex);
            ex.printStackTrace();
            return null;
        }
    }


}
