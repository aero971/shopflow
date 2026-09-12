package com.shopflow.backend.repository;

import com.shopflow.backend.entity.Cart;
import com.shopflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);

    Optional<Cart> findByUserId(Long userId);

    // Eagerly fetches items (and their product) in the SAME query so the
    // collection is already initialized by the time this call returns.
    // With spring.jpa.open-in-view=false, the Hibernate session closes as
    // soon as the repository call completes, so anything relying on lazy
    // loading afterwards (e.g. cart.getItems() in the controller) throws
    // LazyInitializationException. Fetch-joining avoids that entirely.
    @Query("SELECT DISTINCT c FROM Cart c " +
            "LEFT JOIN FETCH c.items i " +
            "LEFT JOIN FETCH i.product " +
            "WHERE c.user = :user")
    Optional<Cart> findByUserWithItems(@Param("user") User user);
}