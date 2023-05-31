package com.teranet.teralearning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class reviewResponseDTO {
    private long id;
    private long testId;
    private long courseId;
    private String author;
    private long rating;
    private String comment;
    private LocalDateTime date;

}
