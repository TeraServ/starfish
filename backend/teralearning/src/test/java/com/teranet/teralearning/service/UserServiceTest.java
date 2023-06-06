package com.teranet.teralearning.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.jupiter.api.Assertions.*;

import java.util.UUID;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    private static final Long userId = 1L;
    private static final int period = 1000;
    private static final String uuid = UUID.randomUUID().toString();
    @Test
    public void testGenerate(){
    }

}
