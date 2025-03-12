package com.OnlineExam.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.OnlineExam.model.Teacher;
import com.OnlineExam.repository.TeacherRepo;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TeacherServiceTest {

    @InjectMocks
    TeacherService teacherService;

    @Mock
    TeacherRepo teacherRepo;

    @Test
    void myfirstTest() {
        Teacher teacher = new Teacher();
        teacher.setEmail("test@example.com");
        teacher.setPassword("password123");
        teacher.setRole("Teacher");
        teacher.setSubject("Math");

        Mockito.when(teacherRepo.save(Mockito.any(Teacher.class))).thenReturn(teacher);

        Teacher addTeacher = teacherService.createTeacher(teacher);

        assertNotNull(addTeacher);
        assertEquals("test@example.com", addTeacher.getEmail());
        assertEquals("Teacher", addTeacher.getRole());

        verify(teacherRepo, times(1)).save(Mockito.any(Teacher.class));
    }
}
