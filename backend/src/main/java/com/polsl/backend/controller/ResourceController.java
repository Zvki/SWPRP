package com.polsl.backend.controller;

import com.polsl.backend.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/resource")
@RequiredArgsConstructor
public class ResourceController {

    private final FileService fileService;
    private static final String URL_PREFIX = "/uploads/";

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String fileUrl) {

        Path BASE_STORAGE_LOCATION = fileService.getRootLocation();

        if (!fileUrl.startsWith(URL_PREFIX)) {
            return ResponseEntity.badRequest().build();
        }

        String relativeFilePath = fileUrl.substring(URL_PREFIX.length());

        try {
            Path targetFilePath = BASE_STORAGE_LOCATION.resolve(relativeFilePath);
            Path finalFilePath = targetFilePath.normalize();

            if (!finalFilePath.startsWith(BASE_STORAGE_LOCATION)) {
                throw new SecurityException("Próba dostępu poza dozwolonym katalogiem: " + relativeFilePath);
            }

            Resource resource = new UrlResource(finalFilePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = "application/pdf";

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException | SecurityException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
