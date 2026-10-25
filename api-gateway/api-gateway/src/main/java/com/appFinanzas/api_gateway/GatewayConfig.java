package com.appFinanzas.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;



@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator configurarRutas(RouteLocatorBuilder builder) {
    return builder.routes()
            // 🔐 1. Ruta para el Microservicio de Login
            // Si la URL lleva "/api/auth/**", lo manda al puerto 808
            .route("ms-auth-login", r-> r.path("/api/auth/**")
                    .uri("http://localhost:8081"))
        // 🛒 2. Ruta para el Microservicio de Gestión de Compras
        // Si la URL lleva "/api/compras/**", lo manda al puerto 8082
            .route("ms-gestion-compras", r -> r.path("/api/compras/**")
                    .uri("http://localhost:8082")).build();

    }
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // Permite llamadas desde cualquier IP (Celular o PC)
        config.addAllowedHeader("*");        // Permite cualquier tipo de cabecera
        config.addAllowedMethod("*");        // Permite GET, POST, PUT, DELETE

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
