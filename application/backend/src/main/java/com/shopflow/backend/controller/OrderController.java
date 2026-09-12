package com.shopflow.backend.controller;

import com.shopflow.backend.dto.OrderResponse;
import com.shopflow.backend.entity.Order;
import com.shopflow.backend.entity.User;
import com.shopflow.backend.repository.UserRepository;
import com.shopflow.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(
            OrderService orderService,
            UserRepository userRepository
    ) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(Authentication authentication) {

        Long userId = getUserId(authentication);

        Order order = orderService.checkout(userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(OrderResponse.from(order));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            Authentication authentication
    ) {
        Long userId = getUserId(authentication);

        List<OrderResponse> orders = orderService.getOrdersForUser(userId)
                .stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getMyOrder(
            Authentication authentication,
            @PathVariable Long id
    ) {
        Long userId = getUserId(authentication);

        Order order = orderService.getOrderForUser(userId, id);

        return ResponseEntity.ok(OrderResponse.from(order));
    }

    private Long getUserId(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found with email: " + email
                        )
                );

        return user.getId();
    }
}