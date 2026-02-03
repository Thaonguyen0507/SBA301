package com.thaonguyen.lab5.service;
import com.thaonguyen.lab5.entities.Category;
import com.thaonguyen.lab5.exception.AppException;
import com.thaonguyen.lab5.exception.ErrorCode;
import com.thaonguyen.lab5.repository.ICategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CategoryService implements ICategoryService {

    private final ICategoryRepository iCategoryRepository;

    public CategoryService(ICategoryRepository iCategoryRepository) {
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return iCategoryRepository.findAll();
    }

    @Override
    public Category getCategoryByID(int categoryID) {
        return iCategoryRepository.findById(categoryID)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REQUEST));
    }
}