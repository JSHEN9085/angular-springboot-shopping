package com.JSHEN.shopping.dao;

import com.JSHEN.shopping.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
