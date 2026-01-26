package com.ponto.service;

import com.ponto.model.Ponto;
import com.ponto.repository.PontoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> registrarPonto(MultipartFile foto) {

        LocalDateTime agora = LocalDateTime.now();
        boolean valido = true;
        String motivo = "Registro válido";

        Optional<Ponto> ultimo = repository.findFirstByOrderByDataHoraDesc();

        if (ultimo.isPresent()) {
            long minutos = Duration.between(ultimo.get().getDataHora(), agora).toMinutes();
            if (minutos < 1) {
                valido = false;
                motivo = "Registro realizado em menos de 1 minuto";
            }
        }

        // Simular salvar foto (desafio não exige salvar real)
        String fotoPath = (foto != null) ? "foto_recebida.png" : null;

        Ponto ponto = new Ponto();
        ponto.setDataHora(agora);
        ponto.setValido(valido);
        ponto.setFotoPath(fotoPath);
        repository.save(ponto);

        // RESPOSTA QUE O FRONT PRECISA
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("valido", valido);
        resposta.put("dataHora", agora.toString());
        resposta.put("status", valido ? "REGISTRADO" : "DESCONSIDERADO");
        resposta.put("motivo", motivo);

        return resposta;
    }

    public Iterable<Ponto> listarTodos() {
        return repository.findAll();
    }
}
