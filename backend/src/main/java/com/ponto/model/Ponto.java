package com.ponto.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pontos")
public class Ponto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datahora;

    private boolean valido;

    private String fotoPath;

    // getters e setters
}
