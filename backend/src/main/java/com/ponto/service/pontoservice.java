package com.ponto.service;

import org.springframework.stereotype.Service;
import com.ponto.model.Ponto;
import com.ponto.repository.pontorepository;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class pontoservice {

    private final pontorepository repository;

    public pontoservice(pontorepository repository) {
        this.repository = repository;
    }

    public Ponto registrarPonto(String fotoPath) {

        LocalDateTime agora = LocalDateTime.now();

        boolean valido = true;

        var ultimoPonto = repository.findFirstByOrderByDataHoraDesc();

        if (ultimoPonto.isPresent()) {
            long minutos = Duration.between(
                    ultimoPonto.get().getdatahora(),
                    agora
            ).toMinutes();

            if (minutos < 1) {
                valido = false;
            }
        }

        Ponto ponto = new Ponto();
        ponto.setdatahora(agora);
        ponto.setValido(valido);
        ponto.setFotoPath(fotoPath);

        return repository.save(ponto);
    }
}
