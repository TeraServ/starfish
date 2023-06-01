package com.teranet.teralearning.controller;

import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = UserController.class)
@WithMockUser
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserService userService;
//    Stream mockStream = new Stream(11,"Computer Science",4999,10,29-05-2023 3:00:22,2022-05-29,1);
    //UserController userController;
    User user;
    @BeforeEach
    void setUp(){
        //userController = new UserController();
        user = new User();
    }
@Test
    public void demoTestMethod(){
    assertTrue(true);
}
@Test
    public void testgetFirstName(){
        assertEquals(20,user.multipy(4,5));
    }
    @Test
    public void testnewUser(){

    }

}


