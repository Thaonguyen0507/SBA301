package com.thaonguyen.lab5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thaonguyen.lab5.entities.Orchid;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
