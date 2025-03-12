package com.OnlineExam.token;

import com.OnlineExam.model.Student;
import com.OnlineExam.model.Teacher;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(value = Include.NON_NULL)
public class JwtTokenRetrive {

    private Teacher teacher;
    private Student student;
    private String token;

    public JwtTokenRetrive(Teacher teacher, String token) {
        this.teacher = teacher;
        this.token = token;
    }

    public JwtTokenRetrive(Student student, String token) {
        this.student = student;
        this.token = token;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
