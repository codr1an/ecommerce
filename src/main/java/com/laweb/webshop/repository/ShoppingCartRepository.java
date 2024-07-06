package com.laweb.webshop.repository;

import com.laweb.webshop.model.ShoppingCart;
import com.laweb.webshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUser(User user);
    List<ShoppingCart> findAllByUser(User user);
    void deleteAllByUser(User user);
}
