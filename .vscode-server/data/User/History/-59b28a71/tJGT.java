package com.openclassrooms.springsecurityauth.repository;

import com.openclassrooms.springsecurityauth.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    // Vous pouvez ajouter des méthodes de recherche personnalisées si besoin
}
