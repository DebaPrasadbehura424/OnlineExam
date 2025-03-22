package com.OnlineExam.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Online Exam Application!";
    }

    @GetMapping("/api/test")
    public String test() {
        return "Test endpoint working!";
    }
}
