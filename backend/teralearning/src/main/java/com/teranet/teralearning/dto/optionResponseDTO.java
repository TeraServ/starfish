package com.teranet.teralearning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class optionResponseDTO {
    private long id;
    private int optionId;
    private String text;
    private Boolean correct;
    private float value;
    private String answer;
    private Boolean selected;
    private Boolean disabled;
    private String styleClass;

}
