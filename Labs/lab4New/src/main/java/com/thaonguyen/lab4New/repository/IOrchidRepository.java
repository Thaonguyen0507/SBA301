package com.thaonguyen.lab4New.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thaonguyen.lab4New.entities.Orchid;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
