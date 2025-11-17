package com.polsl.backend.models.activities;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Entity
@PrimaryKeyJoinColumn(name = "id")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class File extends ActivityReference {
    private String name;
    private String path;
    private String url;
}
