package com.laweb.webshop.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  private JWTRequestFilter jwtRequestFilter;

  public SecurityConfig(JWTRequestFilter jwtRequestFilter) {
    this.jwtRequestFilter = jwtRequestFilter;
  }

  /**
   * Filter chain to configure security.
   * @param http The security object.
   * @return The chain built.
   * @throws Exception Thrown on error configuring.
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.csrf(csrf -> csrf.disable())
          .cors(cors -> cors.configurationSource(request -> {
              var crs = new org.springframework.web.cors.CorsConfiguration();
              crs.setAllowedOrigins(List.of("http://localhost:3000"));
              crs.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
              crs.setAllowedHeaders(List.of("*"));
              return crs;
          }));
          
    // We need to make sure our authentication filter is run before the http request filter is run.
    http.addFilterBefore(jwtRequestFilter, AuthorizationFilter.class);
    http.authorizeHttpRequests()
        // Specific exclusions or rules.
        .requestMatchers("/api/products", "/api/products/{id}", "/api/products/type/{type}","/api/users/register", "/api/users/login", "/swagger-ui" ,"/swagger-ui/**", "/v3/api-docs/**", "/v3/api-docs").permitAll()
        // Everything else should be authenticated.
        .anyRequest().authenticated();
    return http.build();
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurer() {
          @Override
          public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/api/**")
                      .allowedOrigins("http://localhost:3000")
                      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
          }
      };
  }
}
