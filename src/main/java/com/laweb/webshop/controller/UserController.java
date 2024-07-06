package com.laweb.webshop.controller;

import com.laweb.webshop.model.response.LoginResponse;
import com.laweb.webshop.model.User;
import com.laweb.webshop.dto.UpdateUserDTO;
import com.laweb.webshop.model.LoginBody;
import com.laweb.webshop.model.RegistrationBody;
import com.laweb.webshop.model.ShoppingCart;
import com.laweb.webshop.repository.UserRepository;
import com.laweb.webshop.repository.ShoppingCartRepository;
import com.laweb.webshop.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository; // Inject ShoppingCartRepository
    private final UserService userService;

    public UserController(UserRepository userRepository, ShoppingCartRepository shoppingCartRepository, UserService userService) {
        this.userRepository = userRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.userService = userService;
    }

    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created"),
            @ApiResponse(responseCode = "409", description = "Username or email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegistrationBody userDto) {
        return userService.registerUser(userDto);
    }

    @Operation(summary = "Login user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
        String jwt = userService.loginUser(loginBody);
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            LoginResponse response = new LoginResponse();
            response.setJwt(jwt);
            return ResponseEntity.ok(response);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "Get all users")
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Operation(summary = "Get user by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@Parameter(description = "User ID") @PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "Update user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@Parameter(description = "User ID") @PathVariable Long id,
                                           @Valid @RequestBody UpdateUserDTO updatedUserDto) {
        return userService.updateUser(id, updatedUserDto);
    }

    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "Delete user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@Parameter(description = "User ID") @PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();

        // Fetch all shopping carts associated with the user
        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findAllByUser(user);

        // Disassociate user from shopping carts
        shoppingCarts.forEach(cart -> cart.setUser(null));
        shoppingCartRepository.saveAll(shoppingCarts); // Save changes to disassociate user

        // Delete all shopping carts associated with the user
        shoppingCartRepository.deleteAllByUser(user);

        // Now delete the user
        userRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public User getLoggedInUserProfile(@AuthenticationPrincipal User user) {
        return user;
    }
}
