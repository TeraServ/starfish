package com.teranet.teralearning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class userResponseDTO {
    private long id;
    private String firstname;
    private String lastName;
    private String email;
    private String phoneNumber;
    private int userType;
}
