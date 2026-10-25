package com.appFinanzas.api_gateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
public class SecurityConfig {
    @Bean
    public ReactiveJwtDecoder jwtDecoder(@Value("${security.jwt.secret}") String secret) {
        byte[] key = Base64.getDecoder().decode(secret);
        if (key.length <32) {
            throw new IllegalArgumentException("JWT_SECRET debe tener almenos 32 bytes");
        }

        var secretKey = new SecretKeySpec(key, "HmacSHA256");
        var decoder = NimbusReactiveJwtDecoder
                .withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();

        decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer("app-finanzas"));
        return decoder;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(csrf -> csrf.disable())
                .httpBasic(basic -> basic.disable())
                .formLogin(form -> form.disable())
                .securityContextRepository(
                        NoOpServerSecurityContextRepository.getInstance()
                )
                .authorizeExchange(auth -> auth
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .pathMatchers(
                                HttpMethod.POST,
                                "/api/auth/login"
                        ).permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth -> oauth
                        .jwt(jwt -> {})
                )
                .build();
    }
}
