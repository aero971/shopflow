package com.shopflow.backend.service;

import com.shopflow.backend.entity.*;
import com.shopflow.backend.repository.OrderRepository;
import com.shopflow.backend.repository.ProductRepository;
import com.shopflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            CartService cartService
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartService = cartService;
    }

    @Transactional
    public Order checkout(Long userId) {

        Cart cart = cartService.getCart(userId);

        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        // Re-check stock for everything before committing to anything -
        // stock may have changed since items were added to the cart.
        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProduct().getId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Product not found with id: " + cartItem.getProduct().getId()
                            )
                    );

            if (product.getStock() < cartItem.getQuantity()) {
                throw new IllegalArgumentException(
                        "Not enough stock available for " + product.getName()
                );
            }
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found with id: " + userId)
                );

        Order order = new Order(
                user,
                BigDecimal.ZERO,
                OrderStatus.PLACED,
                PaymentMethod.COD,
                LocalDateTime.now()
        );

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {

            Product product = productRepository.findById(cartItem.getProduct().getId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Product not found with id: " + cartItem.getProduct().getId()
                            )
                    );

            int quantity = cartItem.getQuantity();

            product.setStock(product.getStock() - quantity);
            productRepository.save(product);

            // Snapshot name/price now, so the order stays accurate even
            // if this product is edited or removed from the catalog later.
            OrderItem orderItem = new OrderItem(
                    order,
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    quantity
            );

            orderItems.add(orderItem);
            total = total.add(
                    product.getPrice().multiply(BigDecimal.valueOf(quantity))
            );
        }

        order.setItems(orderItems);
        order.setTotal(total);

        Order savedOrder = orderRepository.save(order);

        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserIdWithItems(userId);
    }

    public Order getOrderForUser(Long userId, Long orderId) {

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Order not found with id: " + orderId)
                );

        // Same "not found" message whether the order doesn't exist or
        // belongs to someone else - avoids confirming other users' order
        // ids exist.
        if (!order.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Order not found with id: " + orderId);
        }

        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllWithItems();
    }

    @Transactional
    public Order updateStatus(Long orderId, OrderStatus status) {

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Order not found with id: " + orderId)
                );

        order.setStatus(status);

        return orderRepository.save(order);
    }
}