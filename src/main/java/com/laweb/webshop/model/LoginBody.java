package com.laweb.webshop.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LoginBody {
    private String username;
    private String password;

    @NotBlank
    @NotNull
    public String getUsername() {
        return username;
    }
    
    @NotBlank
    @NotNull
    public String getPassword() {
        return password;
    }
}
