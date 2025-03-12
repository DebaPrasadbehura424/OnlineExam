package com.OnlineExam.doctors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class QuestionPaperDto {

    private long questionPaperId;

    private String subject;

    private String institution;

    private String examType;

    private int fullMarks;

    private int examDuration;

    private Integer numQuestions;

    private long createrId;

}
