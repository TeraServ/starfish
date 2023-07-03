package com.teranet.teralearning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "softDelete")
@Table(name = "deleted_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoftDelete {
    @SequenceGenerator(
            name = "deleteSeq",
            sequenceName = "DELETE_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DELETE_SEQ" )
    @Id
    private long id;
    @Column(name = "record_id", nullable = false)
    private long recordId;
    @Column(name = "type", nullable = false)
    private String type;
    @Column(name = "deletion_date")
    private LocalDate deletionDate;




}

