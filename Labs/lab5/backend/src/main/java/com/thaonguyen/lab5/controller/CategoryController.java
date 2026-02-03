package com.thaonguyen.lab5.controller;

import com.thaonguyen.lab5.dto.ApiResponse;
import com.thaonguyen.lab5.dto.CategoryDTO;
import com.thaonguyen.lab5.mapper.CategoryMapper;
import com.thaonguyen.lab5.service.ICategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final ICategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(ICategoryService categoryService,
                              CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @GetMapping
    public ApiResponse<List<CategoryDTO>> getAll() {
        return ApiResponse.success(
                categoryMapper.toDTOList(categoryService.getAllCategories())
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryDTO> getById(@PathVariable int id) {
        return ApiResponse.success(
                categoryMapper.toDTO(categoryService.getCategoryByID(id))
        );
    }
}
