package com.OnlineExam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OnlineExam.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByStudEmail(String studEmail);

}
