package com.teranet.teralearning.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.teranet.teralearning.model.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuizDTO {
    private long id;
    private String quizName;

    private Topic topic;

    private long creator;

    private long modifier;
    private long passCriteria;

    private boolean allowRetake;

    public boolean isAllowRetake() {
        return allowRetake;
    }
}
