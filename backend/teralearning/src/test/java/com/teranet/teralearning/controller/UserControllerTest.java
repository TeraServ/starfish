package com.teranet.teralearning.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.util.DateUtility;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.coyote.Response;
import org.aspectj.lang.annotation.Before;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = UserController.class)
@ActiveProfiles("test")
@WithMockUser
@SpringBootTest
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private MockMvc mockMvc1;
    @Autowired
    private WebApplicationContext webApplicationContext;
    private DateUtility dateUtility;
    ObjectMapper om = new ObjectMapper();
    User user;
@BeforeEach
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc1=MockMvcBuilders.standaloneSetup(new UserController()).build();
    }
  @Test
    public void addUserTest() throws Exception{

         User user1 = new User();
         user1.setFirstName("Tester");
         user1.setLastName("A");
         user1.setUserStatus(1);
         user1.setEmail("testera@mail.com");
         user1.setUserType(101);
         user1.setStream(new Stream());
         user1.setCreatedDate(dateUtility.getDateTime());
         user1.setModifiedDate(dateUtility.getDateTime());
         String jsonRequest = om.writeValueAsString(user1);
         MvcResult result  = mockMvc.perform(post("/api/user/new").content(jsonRequest)
                 .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
         String resultContent = result.getResponse().getContentAsString();
         User user2 = om.readValue(resultContent,User.class);
         assertTrue(user2.getUserType()==user1.getUserType());
        /* assertTrue(user2.getFirstName()==user1.getLastName());
         assertTrue(user2.getLastName()==user1.getLastName());
         assertTrue(user2.getEmail()==user1.getEmail());
         assertTrue(user2.getPhoneNumber()==user1.getPhoneNumber());*/
    }
    @Test
    public void testGet() throws Exception{
        mockMvc1.perform(get("/api/user/list")).andExpect(status().isOk());
    }


}


