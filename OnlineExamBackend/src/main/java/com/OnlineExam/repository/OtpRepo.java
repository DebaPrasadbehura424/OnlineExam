package com.OnlineExam.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OnlineExam.model.OtpModel;

public interface OtpRepo extends JpaRepository<OtpModel, Long> {

    Optional<OtpModel> findByOtp(String otp);
    

}
