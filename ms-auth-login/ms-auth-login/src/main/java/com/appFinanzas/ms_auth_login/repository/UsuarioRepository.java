package com.appFinanzas.ms_auth_login.repository;

import com.appFinanzas.ms_auth_login.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    // Spring Data JPA crea la consulta SQL "SELECT * FROM usuarios WHERE username = ?" mágicamente
    Optional<Usuario> findByUsername(String username);
}
