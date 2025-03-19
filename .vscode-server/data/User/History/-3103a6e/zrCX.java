import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword()); // ✅ Cryptage
        return new User(user.getEmail(), encryptedPassword, user.getUsername());
    }
}
