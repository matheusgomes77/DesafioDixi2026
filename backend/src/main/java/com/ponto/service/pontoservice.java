package com.ponto.service;

import org.springframework.stereotype.Service;
import com.ponto.model.Ponto;
import com.ponto.repository.PontoRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public Ponto registrarPonto(String fotoPath) {

        LocalDateTime agora = LocalDateTime.now();
        boolean valido = true;

        Optional<Ponto> ultimoPonto = repository.findFirstByOrderByDataHoraDesc();

        if (ultimoPonto.isPresent()) {
            long minutos = Duration.between(
                    ultimoPonto.get().getDataHora(),
                    agora
            ).toMinutes();

            if (minutos < 1) {
                valido = false;
            }
        }

        Ponto ponto = new Ponto();
        ponto.setDataHora(agora);
        ponto.setValido(valido);
        ponto.setFotoPath(fotoPath);

        return repository.save(ponto);
    }

    public Iterable<Ponto> listarTodos() {
        return repository.findAll();
    }
}
