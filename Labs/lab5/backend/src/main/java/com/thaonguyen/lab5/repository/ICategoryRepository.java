package com.thaonguyen.lab5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thaonguyen.lab5.entities.Category;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}
