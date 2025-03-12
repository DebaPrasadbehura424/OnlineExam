package com.OnlineExam.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OnlineExam.model.OtpModel;
import com.OnlineExam.repository.OtpRepo;
import com.OnlineExam.services.OtpServices;
import com.OnlineExam.services.TwilioService;

@RestController
@RequestMapping("/twilio")
public class TwilioController {

    @Autowired
    private OtpServices otpServices;

    @Autowired
    private TwilioService twilioService;

    @Autowired
    private OtpRepo otpRepo;

    @PostMapping("/send/{phoneNumber}")
    public ResponseEntity<?> sendOtp(@PathVariable String phoneNumber) {

        if (!phoneNumber.startsWith("+91")) {
            phoneNumber = "+91" + phoneNumber;
        }
        String otp = otpServices.generateOtp();

        try {
            // Send OTP using the service
            twilioService.sendOtp(phoneNumber, otp);

            return new ResponseEntity<>("OTP sent successfully to " + phoneNumber, HttpStatus.OK);
        } catch (Exception e) {
            Optional<OtpModel> verifyOtp = otpRepo.findByOtp(otp);
            if (verifyOtp.isPresent()) {
                otpRepo.delete(verifyOtp.get());
            }
            return new ResponseEntity<>("Error sending OTP: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
