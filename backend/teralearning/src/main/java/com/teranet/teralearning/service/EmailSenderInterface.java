package com.teranet.teralearning.service;

import com.teranet.teralearning.model.SimpleMailBody;

public interface EmailSenderInterface {
    String sendSimpleMail(SimpleMailBody simpleMailBody);
}
