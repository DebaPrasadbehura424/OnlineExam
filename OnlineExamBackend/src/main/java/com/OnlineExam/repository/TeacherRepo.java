package com.OnlineExam.repository;

import com.OnlineExam.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepo extends JpaRepository<Teacher, Long> {
    Teacher findByEmail(String email);
}
