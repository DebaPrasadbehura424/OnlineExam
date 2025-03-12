package com.OnlineExam.doctors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class TeacherDto {

    private long teacherId;

    private String title;

    private String name;

    private String email;

    private String password;

    private String role;

    private String subject;

}
