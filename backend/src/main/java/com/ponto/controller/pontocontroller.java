package com.ponto.controller;

import com.ponto.service.PontoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pontos")
public class PontoController {

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    // Registrar ponto COM ou SEM foto
    @PostMapping
    public Map<String, Object> registrar(
            @RequestParam(required = false) MultipartFile foto
    ) {
        return service.registrarPonto(foto);
    }

    @GetMapping
    public Iterable<?> listar() {
        return service.listarTodos();
    }
}
