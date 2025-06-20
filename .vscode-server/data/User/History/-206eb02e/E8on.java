package com.openclassrooms.springsecurityauth.repository;

import com.openclassrooms.springsecurityauth.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Ex. pour trouver les messages d'une location
    // List<Message> findByRentalId(Long rentalId);
}
