package com.JSHEN.shopping.dao;

import com.JSHEN.shopping.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") //to prevent cross origin issue: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
//productCategory is the name of JSON, product-category is the path
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
