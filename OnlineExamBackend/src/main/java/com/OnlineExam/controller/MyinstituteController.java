package com.OnlineExam.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.OnlineExam.doctors.MyinstituteDto;
import com.OnlineExam.model.Myinstitute;
import com.OnlineExam.model.Student;
import com.OnlineExam.model.Teacher;
import com.OnlineExam.repository.MyInstituteRepo;
import com.OnlineExam.repository.StudentRepository;
import com.OnlineExam.repository.TeacherRepo;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/institute")
public class MyinstituteController {

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private MyInstituteRepo myInstituteRepo;

    @Autowired
    private StudentRepository studentRepository;

    // POST method to create a new Institute
    @PostMapping("/create/{teacherId}")
    public ResponseEntity<?> createInstitute(
            @PathVariable long teacherId,
            @RequestBody MyinstituteDto myInstituteDto) throws Exception {

        Teacher teacher = teacherRepo.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Myinstitute myInstitute = new Myinstitute();
        myInstitute.setTeacher(teacher);
        myInstitute.setInstituteName(myInstituteDto.getInstituteName());
        myInstitute.setDescription(myInstituteDto.getDescription());
        myInstitute.setMission(myInstituteDto.getMission());
        myInstitute.setUseEmail(myInstituteDto.getUseEmail());
        myInstitute.setLocation(myInstituteDto.getLocation());

        myInstituteRepo.save(myInstitute);

        return new ResponseEntity<>(myInstitute, HttpStatus.CREATED);
    }

    // GET method to retrieve Institute by ID
    @GetMapping("/get/{teacherId}")
    public ResponseEntity<?> getInstitute(@PathVariable long teacherId) {
        Myinstitute myInstitute = myInstituteRepo.findByTeacher_TeacherId(teacherId);

        if (myInstitute == null) {
            return new ResponseEntity<>("Institute not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(myInstitute, HttpStatus.OK);
    }

    // PUT method for updating Institute details (not fully implemented)
    @PutMapping("/update/{myInstituteId}")
    public ResponseEntity<?> updateInstitute(@PathVariable long myInstituteId,
            @RequestBody MyinstituteDto myInstituteDto) {

        Myinstitute myInstitute = myInstituteRepo.findByMyInstituteId(myInstituteId);

        if (myInstitute == null) {
            return new ResponseEntity<>("Institute not found", HttpStatus.NOT_FOUND);
        }

        // Apply updates to the institute details
        if (myInstituteDto.getInstituteName() != null) {
            myInstitute.setInstituteName(myInstituteDto.getInstituteName());
        }
        if (myInstituteDto.getDescription() != null) {
            myInstitute.setDescription(myInstituteDto.getDescription());
        }
        if (myInstituteDto.getMission() != null) {
            myInstitute.setMission(myInstituteDto.getMission());
        }
        if (myInstituteDto.getUseEmail() != null) {
            myInstitute.setUseEmail(myInstituteDto.getUseEmail());
        }
        if (myInstituteDto.getLocation() != null) {
            myInstitute.setLocation(myInstituteDto.getLocation());
        }

        myInstituteRepo.save(myInstitute);

        return new ResponseEntity<>(myInstitute, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{myInstituteId}")
    public ResponseEntity<?> deleteMyInstitute(@PathVariable long myInstituteId) {
        Myinstitute myInstitute = myInstituteRepo.findByMyInstituteId(myInstituteId);

        if (myInstitute == null) {
            return new ResponseEntity<>("Institute not found", HttpStatus.NOT_FOUND);
        }

        Teacher teacher = myInstitute.getTeacher();

        if (teacher != null) {
            teacher.setMyInstitute(null);
            teacherRepo.save(teacher);
        }

        myInstituteRepo.delete(myInstitute);

        return new ResponseEntity<>("Institute and its associated Teacher deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getMyInstitute() {
        List<Myinstitute> myinstitutesList = myInstituteRepo.findAll();
        return new ResponseEntity<>(myinstitutesList, HttpStatus.OK);
    }

    @PostMapping("/addStudentToInstitute/{myInstituteId}/{studentId}")
    public ResponseEntity<?> addStudentToInstitute(
            @PathVariable long myInstituteId,
            @PathVariable long studentId) {

        Myinstitute institute = myInstituteRepo.findByMyInstituteId(myInstituteId);
        if (institute == null) {
            return new ResponseEntity<>("institute not found", HttpStatus.NOT_FOUND);
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (student == null) {
            return new ResponseEntity<>("student not found", HttpStatus.NOT_FOUND);
        }

        if (institute.getStudents().contains(student) && student.getInstitutes().contains(institute)) {
            return new ResponseEntity<>("Student already added to this institute", HttpStatus.BAD_REQUEST);
        }

        if (!institute.getStudents().contains(student)) {
            institute.getStudents().add(student);
        }

        if (!student.getInstitutes().contains(institute)) {
            student.getInstitutes().add(institute);
        }

        myInstituteRepo.save(institute);
        studentRepository.save(student);

        return new ResponseEntity<>(institute, HttpStatus.OK);
    }

    @GetMapping("/getStudents/{myInstituteId}")
    public ResponseEntity<?> getStudentsForInstitute(@PathVariable long myInstituteId) {
        Myinstitute myInstitute = myInstituteRepo.findByMyInstituteId(myInstituteId);

        if (myInstitute == null) {
            return new ResponseEntity<>("Institute not found", HttpStatus.NOT_FOUND);
        }

        Set<Student> students = myInstitute.getStudents();

        if (students.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(students, HttpStatus.OK);
    }

}
