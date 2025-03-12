package com.OnlineExam.security;

import com.twilio.Twilio;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TwilioConfig {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String fromPhoneNumber;

    @PostConstruct
    public void initTwilio() {
        if (accountSid == null || authToken == null) {
            throw new RuntimeException("Twilio credentials are missing.");
        }

        Twilio.init(accountSid, authToken);
        System.out.println("Twilio initialized with SID: " + accountSid); // Confirm Twilio initialization
    }
}
