package com.OnlineExam.doctors;

import com.OnlineExam.model.Teacher;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class MyinstituteDto {

    private Teacher teacher;

    private String instituteName;
    private String description;
    private String mission;
    private String useEmail;
    private String Location;

}
