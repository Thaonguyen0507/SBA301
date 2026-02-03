package com.thaonguyen.lab5.mapper;

import com.thaonguyen.lab5.dto.OrchidDTO;
import com.thaonguyen.lab5.entities.Orchid;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrchidMapper {

    OrchidDTO toDTO(Orchid orchid);

    List<OrchidDTO> toDTOList(List<Orchid> orchids);

    Orchid toEntity(OrchidDTO dto);
}
