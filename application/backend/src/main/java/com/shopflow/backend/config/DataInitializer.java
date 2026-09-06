package com.shopflow.backend.config;

import com.shopflow.backend.entity.Role;
import com.shopflow.backend.entity.User;
import com.shopflow.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String adminEmail = "admin@shopflow.com";

            if (!userRepository.existsByEmail(adminEmail)) {

                User admin = new User(
                        "ShopFlow Admin",
                        adminEmail,
                        passwordEncoder.encode("admin123"),
                        "Pune",
                        Role.ADMIN
                );

                userRepository.save(admin);

                System.out.println("=================================");
                System.out.println("ShopFlow ADMIN created");
                System.out.println("Email: admin@shopflow.com");
                System.out.println("Password: admin123");
                System.out.println("=================================");

            } else {
                System.out.println("ShopFlow ADMIN already exists.");
            }
        };
    }
}