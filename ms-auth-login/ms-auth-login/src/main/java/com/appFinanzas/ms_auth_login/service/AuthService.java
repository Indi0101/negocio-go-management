package com.appFinanzas.ms_auth_login.service;

import com.appFinanzas.ms_auth_login.model.Usuario;
import com.appFinanzas.ms_auth_login.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> validarUsuario(String username, String password){
        return usuarioRepository.findByUsername(username).
                filter(usuario -> usuario.getPassword().equals(password));

    }
}
