package com.polsl.backend.models.activities;

import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public abstract class ActivityReference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private String content;

    @Enumerated(EnumType.STRING)
    private ActivityType type;

    @OneToMany(
            mappedBy = "parentReference",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>();
}
