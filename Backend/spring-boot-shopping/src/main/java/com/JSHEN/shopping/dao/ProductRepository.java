package com.JSHEN.shopping.dao;

import com.JSHEN.shopping.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") //to prevent cross origin issue: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
//if just copy and paste from browser, it will have 'http://localhost:4200/', but we got to remove the '/' at the very end
public interface ProductRepository extends JpaRepository<Product, Long> {
}
