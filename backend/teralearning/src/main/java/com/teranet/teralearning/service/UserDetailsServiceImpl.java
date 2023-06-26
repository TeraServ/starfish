package com.teranet.teralearning.service;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username).get();

        if (user == null) {
            //throw new UserNotFound("Email "+ username +" not found.");
        } else {

        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getGrantedAuthority(user));
    }

    private Collection<GrantedAuthority> getGrantedAuthority(User user) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

}

