package com.OnlineExam.controller;

import com.OnlineExam.doctors.StudentsDto;
import com.OnlineExam.model.Myinstitute;
import com.OnlineExam.model.Student;
import com.OnlineExam.repository.StudentRepository;
import com.OnlineExam.services.StudentService;
import com.OnlineExam.token.JwtTokenRetrive;
import com.OnlineExam.token.JwtUtils;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        Student existingStudent = studentService.getStudentByEmail(student.getStudEmail());
        if (existingStudent != null) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        try {
            student.setStudPassword(passwordEncoder.encode(student.getStudPassword()));
            Student createdStudent = studentService.createStudent(student);
            String token = jwtUtils.generateToken(student.getStudEmail());
            JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(createdStudent, token);
            return new ResponseEntity<>(jwtTokenRetrive, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/registerOauth2")
    public ResponseEntity<?> createStudentByOauth(@RequestBody Student student) {
        Student existingStudent = studentService.getStudentByEmail(student.getStudEmail());
        if (existingStudent != null) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        try {
            Student createdStudent = studentService.createStudent(student);
            String token = jwtUtils.generateToken(student.getStudEmail());
            JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(createdStudent, token);
            return new ResponseEntity<>(jwtTokenRetrive, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenRetrive> studentLoginEntity(@RequestBody StudentsDto studentsDto) {

        Student student = studentService.getStudentByEmail(studentsDto.getStudEmail());
        if (student == null) {
            return ResponseEntity.badRequest().body(null);
        }
        if (!passwordEncoder.matches(studentsDto.getStudPassword(), student.getStudPassword())) {
            return ResponseEntity.badRequest().body(null);
        }
        String token = jwtUtils.generateToken(student.getStudEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(student, token);
        return ResponseEntity.ok(jwtTokenRetrive);
    }

    @PostMapping("/loginOauth2")
    public ResponseEntity<JwtTokenRetrive> studentLoginEntityByOauth2(@RequestBody StudentsDto studentsDto) {

        Student student = studentService.getStudentByEmail(studentsDto.getStudEmail());
        if (student == null) {
            return ResponseEntity.badRequest().body(null);
        }

        String token = jwtUtils.generateToken(student.getStudEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(student, token);
        return ResponseEntity.ok(jwtTokenRetrive);
    }

    @GetMapping("/getInstitutes/{studentId}")
    public ResponseEntity<?> getInstitutesForStudent(@PathVariable long studentId) {
        Student student = studentService.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Set<Myinstitute> institutes = student.getInstitutes();

        if (institutes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(institutes, HttpStatus.OK);
    }

    @PatchMapping("/modifyPassword")
    public ResponseEntity<String> modifyPassword(@RequestBody StudentsDto studentsDto) {

        Student existingTeacher = studentRepository.findByStudEmail(studentsDto.getStudEmail());

        if (existingTeacher != null) {

            String encodedPassword = passwordEncoder.encode(studentsDto.getStudPassword());

            existingTeacher.setStudPassword(encodedPassword);
            studentRepository.save(existingTeacher);

            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.BAD_REQUEST);
        }
    }



}
