package com.polsl.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileService {
    private final Path rootLocation;

    public FileService() throws IOException {
        this.rootLocation = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(this.rootLocation);
    }

    public String storeFile(UUID projectId, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        if (fileName.contains("..")) {
            throw new IOException("Invalid file path: " + fileName);
        }

        Path projectFolder = rootLocation.resolve(projectId.toString());
        Files.createDirectories(projectFolder);

        Path target = projectFolder.resolve(fileName);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + projectId + "/" + fileName;
    }

}
