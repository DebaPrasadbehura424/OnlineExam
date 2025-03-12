package com.OnlineExam.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OnlineExam.model.Student;
import com.OnlineExam.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student getStudentByEmail(String studEmail) {
        return studentRepository.findByStudEmail(studEmail);
    }

    public Optional<Student> findById(long studentId) {
        return studentRepository.findById(studentId);

    }

}
