package com.appFinanzas.ms_auth_login.rest;

import com.appFinanzas.ms_auth_login.model.Usuario;
import com.appFinanzas.ms_auth_login.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.appFinanzas.ms_auth_login.service.JwtService;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @Autowired
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(JwtService jwtService, AuthService authService, AuthService authService1) {
        this.jwtService = jwtService;
        this.authService = authService1;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> credenciales)
    {
        String username = credenciales.get("username");
        String password = credenciales.get("password");

        Optional<Usuario> usuarioValido =authService.validarUsuario(username,password);
        if (usuarioValido.isPresent())
        {
            // Si es correcto, devolvemos los datos del usuario (menos el password por privacidad)
            Usuario u = usuarioValido.get();
            String token = jwtService.generateToken(u);
            return ResponseEntity.ok(Map.of(
                    "status","success",
                    "mensaje","Usuario Logueado Correctamente",
                    "token",token,
                    "tokeType", "bearer",
                    "expiresIn", 900,
                    "id",u.getId(),
                    "username", u.getUsername(),
                    "nombre", u.getNombre()
            ));
        }else {// Si es incorrecto correcto, devolvemos error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status","error","mensaje","Usuario o contresaña Incorrecto"));
        }
    }


}
