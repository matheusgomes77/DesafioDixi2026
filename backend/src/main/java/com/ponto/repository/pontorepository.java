package com.ponto.repository;

import com.ponto.model.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface pontorepository extends JpaRepository<Ponto, Long> {

    Optional<Ponto> findFirstByOrderByDataHoraDesc();

}
