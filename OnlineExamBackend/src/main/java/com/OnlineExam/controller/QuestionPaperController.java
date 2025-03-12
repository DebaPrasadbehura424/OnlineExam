package com.OnlineExam.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.OnlineExam.doctors.QuestionPaperDto;
import com.OnlineExam.model.QuestionPaper;
import com.OnlineExam.model.Teacher;
import com.OnlineExam.repository.QuestionPaperRepo;
import com.OnlineExam.repository.TeacherRepo;
import com.OnlineExam.services.QuestionPaperService;

@RestController
@RequestMapping("/question-papers")
public class QuestionPaperController {

    private final QuestionPaperService questionPaperService;

    @Autowired
    private TeacherRepo teacherRepo;
    @Autowired
    private QuestionPaperRepo questionPaperRepo;

    public QuestionPaperController(QuestionPaperService questionPaperService) {
        this.questionPaperService = questionPaperService;
    }

    @PostMapping("/createQuestionPaper")
    public ResponseEntity<QuestionPaper> createQuestionPaper(@RequestBody QuestionPaperDto questionPaperDto) {
        Teacher teacher = teacherRepo.findById(questionPaperDto.getCreaterId()).orElse(null);

        if (teacher == null) {
            return ResponseEntity.badRequest().build();
        }

        QuestionPaper questionPaper = new QuestionPaper();
        questionPaper.setSubject(questionPaperDto.getSubject());
        questionPaper.setExamType(questionPaperDto.getExamType());
        questionPaper.setExamDuration(questionPaperDto.getExamDuration());
        questionPaper.setTeacher(teacher);

        QuestionPaper createdQuestionPaper = questionPaperService.creaQuestionPaper(questionPaper);

        return ResponseEntity.ok(createdQuestionPaper);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<QuestionPaper>> getQuestionPapersByTeacherId(@PathVariable Long teacherId) {
        List<QuestionPaper> questionPapers = questionPaperRepo.findByTeacher_TeacherId(teacherId);

        return new ResponseEntity<>(questionPapers, HttpStatus.OK);
    }

    @GetMapping("/questionPaper/{questionPaperId}")
    public ResponseEntity<?> getPaper(@PathVariable Long questionPaperId) {
        Optional<QuestionPaper> questionPaper = questionPaperService.findQuestionPaperById(questionPaperId);

        if (questionPaper == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(questionPaper, HttpStatus.OK);
    }

    @DeleteMapping("/questionPaper/{questionPaperId}")
    public ResponseEntity<?> deletePaper(@PathVariable Long questionPaperId) {
        QuestionPaper questionPaper = questionPaperService.findQuestionPaperById(questionPaperId).orElse(null);
        if (questionPaper == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        questionPaperRepo.delete(questionPaper);
        return new ResponseEntity<>("delete successfully", HttpStatus.OK);
    }

    @GetMapping("/getallPapers")
    public ResponseEntity<List<QuestionPaper>> getAllPapers() {
        List<QuestionPaper> questionPapers = questionPaperService.getAllPapers();

        if (questionPapers == null || questionPapers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
        }

        return ResponseEntity.status(HttpStatus.OK).body(questionPapers);
    }

}
