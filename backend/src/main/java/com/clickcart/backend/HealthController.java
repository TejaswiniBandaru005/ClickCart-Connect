package com.clickcart.backend;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController // makes this class handle HTTP requests and return json responses
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/health") // handles GET requests and creates the endpoint to the /api/health
    public Map<String, String> health() {
        String database = jdbcTemplate.queryForObject(
            "SELECT DATABASE()", String.class
        );

        return Map.of(
            "status", "UP",
            "application", "ClickCart Connect",
            "database", database
        );
    }
}
