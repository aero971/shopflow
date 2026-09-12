package com.shopflow.backend.dto;

import com.shopflow.backend.entity.Order;
import com.shopflow.backend.entity.OrderStatus;
import com.shopflow.backend.entity.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponse {

    private Long id;
    private List<OrderItemResponse> items;
    private BigDecimal total;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;

    public OrderResponse() {
    }

    public OrderResponse(
            Long id,
            List<OrderItemResponse> items,
            BigDecimal total,
            OrderStatus status,
            PaymentMethod paymentMethod,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.createdAt = createdAt;
    }

    public static OrderResponse from(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems()
                .stream()
                .map(OrderItemResponse::from)
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                itemResponses,
                order.getTotal(),
                order.getStatus(),
                order.getPaymentMethod(),
                order.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}