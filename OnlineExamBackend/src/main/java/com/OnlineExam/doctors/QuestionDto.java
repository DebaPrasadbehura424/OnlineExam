package com.OnlineExam.doctors;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;
import lombok.NonNull;

@Data
@JsonInclude(value = Include.NON_NULL)
public class QuestionDto {
    @NonNull
    private String questionText;

    @NonNull
    private List<String> options;

    @NonNull
    private String correctAnswer;

    @NonNull
    private Long questionPaperId;

    private List<QuestionDto> questions;
}
