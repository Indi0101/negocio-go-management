package com.appFinanzas.ms_auth_login.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/test")
public class TestDBController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public String db() {
        try {
            String fechaActual = jdbcTemplate.queryForObject("SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') FROM DUAL", String.class);
            return "Conexion exitosa a Oracle Cloud : "+fechaActual;
        }catch (Exception e){
            return "Error  "+e.getMessage();
        }
    }
}
