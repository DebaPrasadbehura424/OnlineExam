package com.OnlineExam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineExamApplication {

	public static void main(String[] args) {
		System.out.println("Starting Online Exam Application...");
		SpringApplication.run(OnlineExamApplication.class, args);
		System.out.println("Application Started Successfully!");
	}

}
