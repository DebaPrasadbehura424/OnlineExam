package com.OnlineExam.doctors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class StudentsDto {
    private String studentName;
    private String studEmail;
    private String studPassword;
    private String studClass;
    private String role;
}
