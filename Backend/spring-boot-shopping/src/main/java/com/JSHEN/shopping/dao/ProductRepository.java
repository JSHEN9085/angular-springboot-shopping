package com.JSHEN.shopping.dao;

import com.JSHEN.shopping.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin("http://localhost:4200") //to prevent cross origin issue: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
//if just copy and paste from browser, it will have 'http://localhost:4200/', but we got to remove the '/' at the very end
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    //findByCategoryId is Query method, match by category id that is indicated in (@RequestParam("id") Long id)
    //Spring will execute query like Select * from product where category_id = parameter passed from frontend
    //url example http://localhost:8080/api/products/search/findByCategoryId?id=1
    //in frontend, id is passed from services/product.service.ts getProductList() method
}
