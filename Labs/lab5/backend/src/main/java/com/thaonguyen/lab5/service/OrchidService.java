package com.thaonguyen.lab5.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.thaonguyen.lab5.entities.Category;
import com.thaonguyen.lab5.entities.Orchid;
import com.thaonguyen.lab5.exception.AppException;
import com.thaonguyen.lab5.exception.ErrorCode;
import com.thaonguyen.lab5.repository.ICategoryRepository;
import com.thaonguyen.lab5.repository.IOrchidRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository iOrchidRepository;
    private final ICategoryRepository iCategoryRepository;

    public OrchidService(IOrchidRepository iOrchidRepository, ICategoryRepository iCategoryRepository) {
        this.iOrchidRepository = iOrchidRepository;
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        log.info("Attempting to insert orchid: {}", orchid);
        
        if (orchid == null) {
            log.error("Orchid is null");
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        
        // Xử lý Category đúng cách - bắt buộc phải có category
        if (orchid.getCategory() == null) {
            log.error("Category is null");
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        
        if (orchid.getCategory().getId() == null) {
            log.error("Category ID is null");
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        
        log.info("Looking for category with ID: {}", orchid.getCategory().getId());
        Category category = iCategoryRepository.findById(orchid.getCategory().getId())
                .orElseThrow(() -> {
                    log.error("Category not found with ID: {}", orchid.getCategory().getId());
                    return new AppException(ErrorCode.INVALID_REQUEST);
                });
        
        orchid.setCategory(category);
        log.info("Successfully found category: {}", category.getCategoryName());
        
        Orchid savedOrchid = iOrchidRepository.save(orchid);
        log.info("Successfully saved orchid with ID: {}", savedOrchid.getId());
        
        return savedOrchid;
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid o = iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REQUEST));

        o.setName(orchid.getName());
        o.setOrchidDescription(orchid.getOrchidDescription());
        o.setIsNatural(orchid.getIsNatural());
        o.setIsAttractive(orchid.getIsAttractive());
        o.setOrchidUrl(orchid.getOrchidUrl());
        
        // Xử lý Category đúng cách - bắt buộc phải có category
        if (orchid.getCategory() == null || orchid.getCategory().getId() == null) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        
        Category category = iCategoryRepository.findById(orchid.getCategory().getId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REQUEST));
        o.setCategory(category);

        return iOrchidRepository.save(o);
    }

    @Override
    public void deleteOrchid(int orchidID) {
        Orchid o = iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));

        iOrchidRepository.delete(o);
    }

    @Override
    public Orchid getOrchidByID(int orchidID) {
        return iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));
    }
}
