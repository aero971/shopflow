package com.shopflow.backend.controller;

import com.shopflow.backend.dto.CartItemResponse;
import com.shopflow.backend.dto.CartResponse;
import com.shopflow.backend.entity.Cart;
import com.shopflow.backend.entity.CartItem;
import com.shopflow.backend.entity.User;
import com.shopflow.backend.repository.UserRepository;
import com.shopflow.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    public CartController(
            CartService cartService,
            UserRepository userRepository
    ) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {

        Long userId = getUserId(authentication);

        Cart cart = cartService.getCart(userId);
        BigDecimal total = cartService.calculateTotal(cart);

        return ResponseEntity.ok(CartResponse.from(cart, total));
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addToCart(
            Authentication authentication,
            @RequestBody CartItemRequest request
    ) {

        Long userId = getUserId(authentication);

        CartItem cartItem = cartService.addToCart(
                userId,
                request.productId(),
                request.quantity()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CartItemResponse.from(cartItem));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<CartItemResponse> updateQuantity(
            Authentication authentication,
            @PathVariable Long productId,
            @RequestBody QuantityRequest request
    ) {

        Long userId = getUserId(authentication);

        CartItem cartItem = cartService.updateQuantity(
                userId,
                productId,
                request.quantity()
        );

        return ResponseEntity.ok(CartItemResponse.from(cartItem));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Void> removeFromCart(
            Authentication authentication,
            @PathVariable Long productId
    ) {

        Long userId = getUserId(authentication);

        cartService.removeFromCart(userId, productId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            Authentication authentication
    ) {

        Long userId = getUserId(authentication);

        cartService.clearCart(userId);

        return ResponseEntity.noContent().build();
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

    public record CartItemRequest(
            Long productId,
            Integer quantity
    ) {
    }

    public record QuantityRequest(
            Integer quantity
    ) {
    }
}