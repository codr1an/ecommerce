package com.laweb.webshop.controller;

import com.laweb.webshop.dto.AddItemRequest;
import com.laweb.webshop.dto.RemoveItemRequest;
import com.laweb.webshop.dto.UpdateItemQuantityRequest;
import com.laweb.webshop.model.*;
import com.laweb.webshop.repository.ProductRepository;
import com.laweb.webshop.repository.ShoppingCartRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    private final ShoppingCartRepository cartRepository;
    private final ProductRepository productRepository;

    public ShoppingCartController(ShoppingCartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Operation(summary = "Get shopping cart for current user")
    @GetMapping
    public ResponseEntity<ShoppingCart> getCart(@AuthenticationPrincipal User user) {
        Optional<ShoppingCart> cartOpt = cartRepository.findByUser(user);
        if (cartOpt.isEmpty()) {
            ShoppingCart cart = new ShoppingCart();
            cart.setUser(user);
            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        }
        ShoppingCart cart = cartOpt.get();
        cart.updateTotalPrice();
        return ResponseEntity.ok(cart);
    }

    @Operation(summary = "Add item to cart")
    @PostMapping("/add")
    public ResponseEntity<ShoppingCart> addItemToCart(@AuthenticationPrincipal User user, @RequestBody AddItemRequest addItemRequest) {
        Optional<Product> productOpt = productRepository.findById(addItemRequest.getProductId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Product product = productOpt.get();
        ShoppingCart cart = cartRepository.findByUser(user).orElseGet(() -> {
            ShoppingCart newCart = new ShoppingCart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(addItemRequest.getQuantity());

        cart.getItems().add(cartItem);
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }

    @Operation(summary = "Update quantity of a product in the cart")
    @PutMapping("/update")
    public ResponseEntity<ShoppingCart> updateCartItemQuantity(@AuthenticationPrincipal User user, @RequestBody UpdateItemQuantityRequest updateItemQuantityRequest) {
        ShoppingCart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<CartItem> cartItemOpt = cart.getItems().stream()
                .filter(item -> item.getId().equals(updateItemQuantityRequest.getItemId()))
                .findFirst();

        if (cartItemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        CartItem cartItem = cartItemOpt.get();
        int newQuantity = updateItemQuantityRequest.getQuantity();

        if (newQuantity > 0) {
            cartItem.setQuantity(newQuantity);
        } else {
            cart.getItems().remove(cartItem);
        }

        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }

    @Operation(summary = "Delete item from cart")
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeItemFromCart(@AuthenticationPrincipal User user, @RequestBody RemoveItemRequest removeItemRequest) {
        ShoppingCart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        cart.getItems().removeIf(item -> item.getId().equals(removeItemRequest.getItemId()));
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Clear the cart")
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User user) {
        ShoppingCart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        cart.getItems().clear();
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.noContent().build();
    }
    
}
