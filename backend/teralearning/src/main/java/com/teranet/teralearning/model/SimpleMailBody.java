package com.teranet.teralearning.model;

import lombok.*;

@Data
@NoArgsConstructor
@Setter
@Getter
public class SimpleMailBody {
    private String recipient, msgBody, subject;

    public SimpleMailBody(String recipient, String msgBody, String subject) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
    }
}
