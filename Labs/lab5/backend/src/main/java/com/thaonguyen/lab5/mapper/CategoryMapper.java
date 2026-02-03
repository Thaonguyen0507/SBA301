package com.thaonguyen.lab5.mapper;

import com.thaonguyen.lab5.dto.CategoryDTO;
import com.thaonguyen.lab5.entities.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDTO toDTO(Category category);

    List<CategoryDTO> toDTOList(List<Category> categories);

    Category toEntity(CategoryDTO dto);
}
