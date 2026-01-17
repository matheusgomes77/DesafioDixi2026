package com.ponto.controller;

import org.springframework.web.bind.annotation.*;
import com.ponto.model.Ponto;
import com.ponto.service.pontoservice;

@RestController
@RequestMapping("/pontos")
public class pontocontroller {

    private final pontoservice service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @PostMapping
    public Ponto registrar(@RequestParam(required = false) String fotoPath) {
        return service.registrarPonto(fotoPath);
    }

    @GetMapping
    public Iterable<Ponto> listar() {
        return service.listarTodos();
    }
}
