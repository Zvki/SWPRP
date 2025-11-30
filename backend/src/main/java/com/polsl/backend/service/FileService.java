package com.polsl.backend.service;

import lombok.Getter;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.util.Tuple;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.UUID;

@Getter
@Service
public class FileService {
    private final Path rootLocation;

    public FileService() throws IOException {
        this.rootLocation = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(this.rootLocation);
    }

    public Tuple<String, String> storeFile(UUID projectId, MultipartFile file) throws IOException {
        String originalName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        if (originalName.contains("..")) {
            throw new IOException("Invalid file path: " + originalName);
        }

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String fileName = timestamp + "_" + originalName;

        Path projectFolder = rootLocation.resolve(projectId.toString());
        Files.createDirectories(projectFolder);

        Path target = projectFolder.resolve(fileName);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return new Tuple<>("/uploads/" + projectId + "/" + fileName, fileName);
    }

}
