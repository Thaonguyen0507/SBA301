package com.thaonguyen.lab5.controller;

import com.thaonguyen.lab5.dto.ApiResponse;
import com.thaonguyen.lab5.dto.OrchidDTO;
import com.thaonguyen.lab5.mapper.OrchidMapper;
import com.thaonguyen.lab5.service.IOrchidService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final IOrchidService orchidService;
    private final OrchidMapper orchidMapper;

    public OrchidController(IOrchidService orchidService,
            OrchidMapper orchidMapper) {
        this.orchidService = orchidService;
        this.orchidMapper = orchidMapper;
    }

    @GetMapping
    public ApiResponse<List<OrchidDTO>> getAll() {
        return ApiResponse.success(
                orchidMapper.toDTOList(orchidService.getAllOrchids()));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrchidDTO> getById(@PathVariable int id) {
        return ApiResponse.success(
                orchidMapper.toDTO(orchidService.getOrchidByID(id)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrchidDTO> create(@RequestBody OrchidDTO orchidDTO) {
        log.info("Received OrchidDTO: {}", orchidDTO);
        log.info("OrchidDTO name: {}", orchidDTO.getName());
        log.info("OrchidDTO category: {}", orchidDTO.getCategory());
        if (orchidDTO.getCategory() != null) {
            log.info("Category ID: {}", orchidDTO.getCategory().getId());
            log.info("Category name: {}", orchidDTO.getCategory().getCategoryName());
        }
        
        return ApiResponse.success(
                orchidMapper.toDTO(
                        orchidService.insertOrchid(
                                orchidMapper.toEntity(orchidDTO))),
                "Created successfully");
    }

    @PutMapping("/{id}")
    public ApiResponse<OrchidDTO> update(
            @PathVariable int id,
            @RequestBody OrchidDTO orchidDTO) {

        return ApiResponse.success(
                orchidMapper.toDTO(
                        orchidService.updateOrchid(
                                id,
                                orchidMapper.toEntity(orchidDTO))),
                "Updated successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable int id) {
        orchidService.deleteOrchid(id);
        return ApiResponse.success("Deleted successfully");
    }
}
