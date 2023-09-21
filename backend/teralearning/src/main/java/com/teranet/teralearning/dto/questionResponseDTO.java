package com.teranet.teralearning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class questionResponseDTO {
    private long questionId;
    private long quizId;
    private long topic;
    private String type;
    private String questionText;
    private Set<optionResponseDTO> options;
    private Set<optionResponseDTO> answers;
    private String explanation;
    private int maxSelection;
    private String creator;

}
