package com.thaonguyen.lab4New.service;

import java.util.List;
import java.util.Optional;

import com.thaonguyen.lab4New.entities.Orchid;

public interface IOrchidService {
    public List<Orchid> getAllOrchids();

    public Orchid insertOrchid(Orchid orchid);

    public Orchid updateOrchid(int orchidID, Orchid orchid);

    public void deleteOrchid(int orchidID);

    public Optional<Orchid> getOrchidByID(int orchidID);
}
