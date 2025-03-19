package com.openclassrooms.springsecurityauth.controller;

import com.openclassrooms.springsecurityauth.model.User;
import com.openclassrooms.springsecurityauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // POST /auth/register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Le service pourra par exemple hacher le mot de passe avant de sauvegarder
        return userService.registerUser(user);
    }

    // POST /auth/login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // Ici, vous devez vérifier les credentials et générer un token JWT.
        return "JWT_TOKEN";
    }

    // GET /auth/me
    @GetMapping("/me")
    public User getCurrentUser() {
        // Exemple de retour pour tester l'endpoint; "TestUser" est désormais le username.
        return new User("test@test.com", "secret", "TestUser");
    }
}
