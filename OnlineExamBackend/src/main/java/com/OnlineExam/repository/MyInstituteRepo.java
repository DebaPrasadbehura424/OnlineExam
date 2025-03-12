package com.OnlineExam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OnlineExam.model.Myinstitute;

public interface MyInstituteRepo extends JpaRepository<Myinstitute, Long> {

    Myinstitute findByTeacher_TeacherId(long teacherId);

    Myinstitute findByMyInstituteId(long myInstituteId);

}
