package com.OnlineExam.repository;

import com.OnlineExam.model.QuestionPaper;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionPaperRepo extends JpaRepository<QuestionPaper, Long> {

    List<QuestionPaper> findByTeacher_TeacherId(Long teacherId);

    Optional<QuestionPaper> findByQuestionPaperId(Long questionPaperId);

}
