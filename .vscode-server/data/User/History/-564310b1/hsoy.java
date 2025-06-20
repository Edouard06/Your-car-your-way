package com.openclassrooms.springsecurityauth.controller;

import com.openclassrooms.springsecurityauth.dto.RentalDTO;
import com.openclassrooms.springsecurityauth.mapper.RentalMapper;
import com.openclassrooms.springsecurityauth.model.Rental;
import com.openclassrooms.springsecurityauth.service.ImageService;
import com.openclassrooms.springsecurityauth.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;
    private final RentalMapper rentalMapper;
    private final ImageService imageService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RentalDTO> createRental(
            @RequestPart("rental") RentalDTO rentalDTO,
            @RequestPart("image") MultipartFile image) {
        // 1) Stocker l'image et obtenir son URL
        String imageUrl = imageService.storeImage(image);

        // 2) Affecter l'URL de l'image dans le DTO
        rentalDTO.setPicture(imageUrl);

        // 3) Convertir le DTO en entité
        Rental rental = rentalMapper.rentalDTOToRental(rentalDTO);

        // 4) Enregistrer la location via le service
        Rental savedRental = rentalService.createRental(rental);

        // 5) Convertir l'entité enregistrée en DTO
        RentalDTO savedDTO = rentalMapper.rentalToRentalDTO(savedRental);

        // 6) Renvoyer le DTO créé avec HTTP 201 (Created)
        return new ResponseEntity<>(savedDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RentalDTO>> getAllRentals() {
        List<Rental> rentals = rentalService.getAllRentals();
        List<RentalDTO> dtos = rentals.stream()
                .map(rentalMapper::rentalToRentalDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentalDTO> getRental(@PathVariable Long id) {
        return rentalService.getRental(id)
                .map(rental -> ResponseEntity.ok(rentalMapper.rentalToRentalDTO(rental)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
