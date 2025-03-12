package com.OnlineExam.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OnlineExam.model.Teacher;
import com.OnlineExam.repository.TeacherRepo;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepo teacherRepo;

    public Teacher createTeacher(Teacher teacher) {
        return teacherRepo.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepo.findAll();
    }

    public Teacher getTeacherByEmail(String email) {
        return teacherRepo.findByEmail(email);
    }
}
