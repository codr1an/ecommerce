package com.laweb.webshop.repository;

import com.laweb.webshop.model.Order;
import com.laweb.webshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
