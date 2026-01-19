package com.ponto.dto;

import java.time.LocalDateTime;

public class PontoResponseDto {

    private Long id;
    private LocalDateTime dataHora;
    private boolean valido;
    private String fotoPath;

    public PontoResponseDto(Long id, LocalDateTime dataHora, boolean valido, String fotoPath) {
        this.id = id;
        this.dataHora = dataHora;
        this.valido = valido;
        this.fotoPath = fotoPath;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public boolean isValido() {
        return valido;
    }

    public String getFotoPath() {
        return fotoPath;
    }
}
