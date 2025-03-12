package com.OnlineExam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OnlineExam.services.EmailService;
import com.OnlineExam.services.OtpServices;

import jakarta.mail.MessagingException;
import lombok.Data;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final OtpServices otpServices;

    public EmailController(OtpServices otpServices) {
        this.otpServices = otpServices;
    }

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {

            String otphere = otpServices.generateOtp();
            emailRequest.setBody(otphere);

            emailService.sendEmail(emailRequest.getTo(), emailRequest.getBody());

            return new ResponseEntity<>("Email send easily", HttpStatus.OK);
        } catch (MessagingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteOtp/{otp}")
    public ResponseEntity<?> deleteOtp(@PathVariable String otp) {
        boolean here = otpServices.verifyOtp(otp);
        if (here == true) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

}

@Data

class EmailRequest {
    private String to;
    private String body;

}
