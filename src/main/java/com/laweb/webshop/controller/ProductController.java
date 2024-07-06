package com.laweb.webshop.controller;

import com.laweb.webshop.model.Product;
import com.laweb.webshop.repository.ProductRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@Api(tags = "Product Management")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @ApiOperation("Get all products")
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @ApiOperation("Get a product by ID")
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id);
    }

    @ApiOperation("Get products by type")
    @GetMapping("/type/{type}")
    public List<Product> getProductsByCategory(@PathVariable String type) {
        return productRepository.findByType(type);
    }

    @PreAuthorize("hasRole('admin')")
    @ApiOperation("Add a new product")
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PreAuthorize("hasRole('admin')")
    @ApiOperation("Update a product")
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setPrice(updatedProduct.getPrice());
                    product.setDescription(updatedProduct.getDescription());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    @PreAuthorize("hasRole('admin')")
    @ApiOperation("Delete a product")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
