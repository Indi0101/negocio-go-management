package com.appFinanzas.ms_auth_login.service;

import com.appFinanzas.ms_auth_login.model.Usuario;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.util.Base64;


@Service
public class JwtService {
    private final JwtEncoder encoder;

    public JwtService(@Value("${security.jwt.secret}") String secret)
            throws IllegalAccessException {
        byte[] key = Base64.getDecoder().decode(secret);
        if(key.length < 32){
            throw new IllegalAccessException( "JWT_SECRET debe contener al menos 32 bytes");
        }
        this.encoder = new NimbusJwtEncoder(new ImmutableSecret<>(key));
    }

    public String generateToken(Usuario usuario){
        Instant ahora = Instant.now();

        JwtClaimsSet claims =JwtClaimsSet.builder()
                .issuer("app-finanzas")
                .subject(String.valueOf(usuario.getId()))
                .issuedAt(ahora)
                .expiresAt(ahora.plusSeconds(900))
                .claim("username", usuario.getUsername())
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
