package com.appFinanzas.ms_auth_login.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data // <-- Esto genera automáticamente todos los Getters, Setters, toString, etc.
@NoArgsConstructor // <-- Genera el constructor vacío obligatorio para JPA
@AllArgsConstructor // <-- Genera un constructor con todos los atributos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido;

    @Column(nullable = false, length = 100)
    private String dni;

    @Column(nullable = false, length = 150)
    private String direccion;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 100)
    private String rol;
}
