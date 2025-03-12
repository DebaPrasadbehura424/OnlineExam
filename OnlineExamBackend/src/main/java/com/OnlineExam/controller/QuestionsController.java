package com.OnlineExam.controller;

import com.OnlineExam.doctors.QuestionDto;
import com.OnlineExam.model.Question;
import com.OnlineExam.model.QuestionPaper;
import com.OnlineExam.services.QuestionService;
import com.OnlineExam.repository.QuestionPaperRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
public class QuestionsController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionPaperRepo questionPaperRepo;

    @PostMapping("/createQuestions")
    public ResponseEntity<?> createQuestions(@RequestBody List<QuestionDto> questionDtos) {
        System.out.println("Received questions: " + questionDtos);

        if (questionDtos.isEmpty()) {
            return ResponseEntity.badRequest().body("No questions provided.");
        }

        try {
            List<Question> questions = questionDtos.stream().map(questionDto -> {
                System.out.println("Processing question: " + questionDto);

                if (questionDto.getQuestionText() == null || questionDto.getQuestionText().isEmpty()) {
                    throw new IllegalArgumentException("Question text is required.");
                }
                if (questionDto.getCorrectAnswer() == null || questionDto.getCorrectAnswer().isEmpty()) {
                    throw new IllegalArgumentException("Correct answer is required.");
                }
                if (questionDto.getOptions() == null || questionDto.getOptions().size() != 4) {
                    throw new IllegalArgumentException("Exactly 4 options are required.");
                }

                QuestionPaper questionPaper = questionPaperRepo.findById(questionDto.getQuestionPaperId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid QuestionPaper ID"));

                Question question = new Question();
                question.setQuestionText(questionDto.getQuestionText());
                question.setOptions(questionDto.getOptions());
                question.setCorrectAnswer(questionDto.getCorrectAnswer());
                question.setQuestionPaper(questionPaper);

                return question;
            }).collect(Collectors.toList());

            List<Question> questions2 = questionService.saveQuestion(questions);

            return new ResponseEntity<>(questions2, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    




}
