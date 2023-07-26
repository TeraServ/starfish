package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Quiz {
    @SequenceGenerator(
            name="seqGenForQuiz",
            sequenceName = "QUIZ_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(strategy = SEQUENCE,
            generator = "QUIZ_SEQ")
    @Id
    private long id;
    @Column(name = "quiz_name", unique = true)
    private String quizName;
    @OneToOne
    @JoinColumn(name = "topic",referencedColumnName = "id")
    private Topic topic;
    @OneToOne
    @JoinColumn(name = "creator",referencedColumnName = "id")
    private User creator;
    @OneToOne
    @JoinColumn(name = "modifier",referencedColumnName = "id")
    private User modifier;
    @ElementCollection
    @CollectionTable(name = "questions")
    @Column(name = "questions")
    private List<Question> questions = new ArrayList<>();
    @Column(name = "pass_criteria")
    private long passCriteria;
    @Column(name = "allow_retake")
    private boolean allowRetake;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;


}
