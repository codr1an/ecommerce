package com.laweb.webshop.service;
import com.laweb.webshop.model.User;
import com.laweb.webshop.dto.UpdateUserDTO;
import com.laweb.webshop.model.LoginBody;
import com.laweb.webshop.model.RegistrationBody;
import com.laweb.webshop.repository.UserRepository;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    // debugging
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final EncryptingService encryptingService;
    private final JWTService jwtService;

    public UserService(UserRepository userRepository, EncryptingService encryptingService, JWTService jwtService) {
        this.userRepository = userRepository;
        this.encryptingService = encryptingService;
        this.jwtService = jwtService;
    }

    public ResponseEntity<User> registerUser(RegistrationBody userDto) {
      if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
          logger.debug("Username already exists: {}", userDto.getUsername());
          return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
  
      logger.debug("Checking if email already exists");
      if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
          logger.debug("Email already exists: {}", userDto.getEmail());
          return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
  
      // Encrypt the password
      String encryptedPassword = encryptingService.encryptPassword(userDto.getPassword());
  
      // Create a new User entity from the DTO
      User user = new User();
      user.setUsername(userDto.getUsername());
      user.setEmail(userDto.getEmail());
      user.setAddress(userDto.getAddress());
      user.setFirstName(userDto.getFirstName());
      user.setLastName(userDto.getLastName());
      user.setPassword(encryptedPassword);
  
      // Save the new user
      userRepository.save(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

     public ResponseEntity<User> updateUser(Long id, UpdateUserDTO updatedUserDto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Update user fields
            user.setEmail(updatedUserDto.getEmail());
            user.setFirstName(updatedUserDto.getFirstName());
            user.setLastName(updatedUserDto.getLastName());
            user.setAddress(updatedUserDto.getAddress());

            // Hash the new password if provided
            if (updatedUserDto.getPassword() != null && !updatedUserDto.getPassword().isEmpty()) {
                String encryptedPassword = encryptingService.encryptPassword(updatedUserDto.getPassword());
                user.setPassword(encryptedPassword);
            }

            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public String loginUser(LoginBody loginBody) {
        Optional<User> opUser = userRepository.findByUsername(loginBody.getUsername());
        if (opUser.isPresent()) {
          User user = opUser.get();
          if (encryptingService.verifyPassword(loginBody.getPassword(), user.getPassword())) {
            return jwtService.generateJWT(user);
          }
        }
        return null;
      }
}
