package com.OnlineExam.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
public class Myinstitute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myInstituteId;

    @OneToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Teacher teacher;

    private String instituteName;
    private String description;
    private String mission;
    private String useEmail;
    private String location;

    @ManyToMany
    @JoinTable(name = "institute_student", joinColumns = @JoinColumn(name = "my_institute_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Set<Student> students;

}
