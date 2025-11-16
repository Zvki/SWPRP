package com.polsl.backend.models.activities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@PrimaryKeyJoinColumn(name = "id")
@Data
public class Comment extends ActivityReference {
    private String content;

    @ManyToOne
    @JoinColumn(name = "parent_reference_id")
    private ActivityReference parentReference;
}
