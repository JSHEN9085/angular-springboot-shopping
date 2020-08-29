package com.JSHEN.shopping.dao;

import com.JSHEN.shopping.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
//productCategory is the name of JSON, product-category is the path
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
