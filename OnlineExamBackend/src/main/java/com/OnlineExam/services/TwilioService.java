package com.OnlineExam.services;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.phone-number}")
    private String fromPhoneNumber;

    public void sendOtp(String toPhoneNumber, String otp) {
        try {
            Message message = Message.creator(
                    new PhoneNumber(toPhoneNumber),
                    new PhoneNumber(fromPhoneNumber),
                    "Your OTP is: " + otp).create();
            System.out.println("OTP sent successfully with SID: " + message.getSid());
        } catch (Exception e) {
            System.out.println("Error sending OTP: " + e);
            throw new RuntimeException("Failed to send OTP", e);
        }
    }
}
