package com.teranet.teralearning.repository;
import com.teranet.teralearning.model.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.when;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Collections;
import java.util.Optional;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {
    @Mock
    private UserRepository userRepository;
    private final Long correctTest =1L;
    @Before
    public void setup(){
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void testFindAll(){
        User user = new User();
        user.setId(this.correctTest);
        user.setFirstName("Tester");
        user.setLastName("A");
        user.setUserStatus(1);
        user.setEmail("testera@mail.com");
        user.setUserType(101);
        when(this.userRepository.findAll()).thenReturn(Collections.singletonList(user));
        assertTrue(this.userRepository.findAll().size()==1);
    }
    @Test
    public void testFindById(){
        User user = new User();
        user.setId(this.correctTest);
        user.setFirstName("Tester");
        user.setLastName("A");
        user.setUserStatus(1);
        user.setEmail("testera@mail.com");
        user.setUserType(101);
        when(this.userRepository.findById(this.correctTest)).thenReturn(Optional.of(user));
        assertTrue(this.userRepository.findById(this.correctTest).get().getFirstName().equals("Tester"));
    }
    @Test
    public void testSave(){
        User user = new User();
        user.setId(this.correctTest);
        user.setFirstName("Tester");
        user.setLastName("A");
        user.setUserStatus(1);
        user.setEmail("testera@mail.com");
        user.setUserType(101);

    }


}
