package com.OnlineExam.services;

import java.security.SecureRandom;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OnlineExam.model.OtpModel;
import com.OnlineExam.repository.OtpRepo;

@Service
public class OtpServices {

    @Autowired
    private OtpRepo otpRepo;

    public String generateOtp() {
        SecureRandom secureRandom = new SecureRandom();
        int otpValue = 100000 + secureRandom.nextInt(900000);
        OtpModel otpModel = new OtpModel();
        otpModel.setOtp(String.valueOf(otpValue));
        otpRepo.save(otpModel);
        return otpModel.getOtp();
    }

    public boolean verifyOtp(String otp) {
        Optional<OtpModel> verifyOtp = otpRepo.findByOtp(otp);

        if (verifyOtp.isPresent()) {
            otpRepo.delete(verifyOtp.get());
            return true;
        } else {
            return false;
        }
    }

}
