package com.OnlineExam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.OnlineExam.doctors.TeacherDto;
import com.OnlineExam.model.Teacher;
import com.OnlineExam.repository.TeacherRepo;
import com.OnlineExam.services.TeacherService;
import com.OnlineExam.token.JwtTokenRetrive;
import com.OnlineExam.token.JwtUtils;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @Autowired
    private TeacherRepo teacherRepo;

    @PostMapping("/register")
    public ResponseEntity<?> createTeacher(@RequestBody Teacher teacher) {
        Teacher teacher2 = teacherService.getTeacherByEmail(teacher.getEmail());
        if (teacher2 != null) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        Teacher createdTeacher = teacherService.createTeacher(teacher);
        String token = jwtUtils.generateToken(teacher.getEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(createdTeacher, token);
        return new ResponseEntity<>(jwtTokenRetrive, HttpStatus.CREATED);
    }

    @PostMapping("/registerOauth2")
    public ResponseEntity<?> createTeacherByOauth(@RequestBody Teacher teacher) {
        Teacher teacher2 = teacherService.getTeacherByEmail(teacher.getEmail());
        if (teacher2 != null) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        Teacher createdTeacher = teacherService.createTeacher(teacher);
        String token = jwtUtils.generateToken(teacher.getEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(createdTeacher, token);
        return new ResponseEntity<>(jwtTokenRetrive, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenRetrive> authenticateTeacher(@RequestBody TeacherDto teacherDto) {
   
        Teacher teacher = teacherService.getTeacherByEmail(teacherDto.getEmail());
        if (teacher == null) {
            return ResponseEntity.badRequest().body(null);
        }
        if (!passwordEncoder.matches(teacherDto.getPassword(),
                teacher.getPassword())) {
            return ResponseEntity.badRequest().body(null);
        }

        String token = jwtUtils.generateToken(teacher.getEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(teacher, token);
        return ResponseEntity.ok(jwtTokenRetrive);
    }

    @PostMapping("/loginOauth2")
    public ResponseEntity<JwtTokenRetrive> authenticateTeacherByOauth2(@RequestBody TeacherDto teacherDto) {

        Teacher teacher = teacherService.getTeacherByEmail(teacherDto.getEmail());
        if (teacher == null) {
            return ResponseEntity.badRequest().body(null);
        }

        String token = jwtUtils.generateToken(teacher.getEmail());
        JwtTokenRetrive jwtTokenRetrive = new JwtTokenRetrive(teacher, token);
        return ResponseEntity.ok(jwtTokenRetrive);
    }

    @GetMapping("/profile")
    public ResponseEntity<Teacher> getProfile(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            System.out.println(!jwtUtils.isTokenExpired(token));
        }
        if (token != null && !jwtUtils.isTokenExpired(token)) {
            String username = jwtUtils.extractSubject(token);
            Teacher teacher = teacherService.getTeacherByEmail(username);
            return new ResponseEntity<>(teacher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping("/modifyPassword")
    public ResponseEntity<String> modifyPassword(@RequestBody TeacherDto teacherDto) {

        Teacher existingTeacher = teacherRepo.findByEmail(teacherDto.getEmail());

        if (existingTeacher != null) {

            String encodedPassword = passwordEncoder.encode(teacherDto.getPassword());

            existingTeacher.setPassword(encodedPassword);
            teacherRepo.save(existingTeacher);

            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            // If teacher with email doesn't exist, return error response
            return new ResponseEntity<>("Email not found", HttpStatus.BAD_REQUEST);
        }
    }

}
