package com.OnlineExam.services;

import com.OnlineExam.model.Question;
import com.OnlineExam.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;

    // Save a question
    public List<Question> saveQuestion(List<Question> question) {
        return questionRepo.saveAll(question);
    }

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }
}
