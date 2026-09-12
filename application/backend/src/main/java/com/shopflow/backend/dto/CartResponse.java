package com.shopflow.backend.dto;

import com.shopflow.backend.entity.Cart;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class CartResponse {

    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal total;

    public CartResponse() {
    }

    public CartResponse(Long id, List<CartItemResponse> items, BigDecimal total) {
        this.id = id;
        this.items = items;
        this.total = total;
    }

    public static CartResponse from(Cart cart, BigDecimal total) {
        List<CartItemResponse> itemResponses = cart.getItems()
                .stream()
                .map(CartItemResponse::from)
                .collect(Collectors.toList());

        return new CartResponse(cart.getId(), itemResponses, total);
    }

    public Long getId() {
        return id;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public BigDecimal getTotal() {
        return total;
    }
}