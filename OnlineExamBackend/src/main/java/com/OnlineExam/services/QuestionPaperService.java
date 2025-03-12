package com.OnlineExam.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.OnlineExam.model.QuestionPaper;
import com.OnlineExam.repository.QuestionPaperRepo;

@Service
public class QuestionPaperService {

    private QuestionPaperRepo questionPaperRepo;

    public QuestionPaperService(QuestionPaperRepo questionPaperRepo) {
        this.questionPaperRepo = questionPaperRepo;
    }

    public QuestionPaper creaQuestionPaper(QuestionPaper questionPaper) {
        return questionPaperRepo.save(questionPaper);
    }

    public Optional<QuestionPaper> findQuestionPaperById(Long questionPaperId) {
        return questionPaperRepo.findById(questionPaperId);
    }

    public boolean deleteQuestionPaperById(Long questionPaperId) {
        QuestionPaper questionPaper = questionPaperRepo.findById(questionPaperId).orElse(null);
        if (questionPaper == null) {
            return false;

        }
        questionPaperRepo.deleteById(questionPaperId);
        return true;
    }

    public List<QuestionPaper> getAllPapers() {
        return questionPaperRepo.findAll();
    }

}
