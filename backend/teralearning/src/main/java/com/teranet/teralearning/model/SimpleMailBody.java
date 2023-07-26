package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleMailBody {
    private String recipient, msgBody, subject;
}
