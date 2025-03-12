package com.OnlineExam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long teacherId;

    @Column(unique = true)
    private String email;

    private String password;

    private String role;

    private String subject;

    @OneToOne(mappedBy = "teacher")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Myinstitute myInstitute;
}
