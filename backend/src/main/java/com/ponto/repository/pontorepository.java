package com.ponto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ponto.model.Ponto;

import java.util.Optional;

public interface PontoRepository extends JpaRepository<Ponto, Long> {

    Optional<Ponto> findFirstByOrderByDataHoraDesc();
}

