package com.appFinanzas.ms_auth_login;

import com.appFinanzas.ms_auth_login.model.Usuario;
import com.appFinanzas.ms_auth_login.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

@SpringBootApplication
public class MsAuthLoginApplication {

	public static void main(String[] args) {
		try {
			// Intentamos ubicar la carpeta wallet dentro de resources de forma segura
			File walletDir = ResourceUtils.getFile("classpath:wallet");
			String rutaWallet = walletDir.getAbsolutePath();

			System.setProperty("oracle.net.tns_admin", rutaWallet);
			System.out.println("Wallet cargada correctamente desde: " + rutaWallet);
		} catch (FileNotFoundException e) {
			System.err.println("No se encontró la carpeta wallet en el classpath: " + e.getMessage());
		}
		SpringApplication.run(MsAuthLoginApplication.class, args);

	}
	@Bean
	CommandLineRunner initDatabase(UsuarioRepository repository)
	{
		return args ->{
			if (repository.count()==0)
			{
				Usuario usuario = new Usuario();
				usuario.setUsername("indi");
				usuario.setPassword("indi");
				usuario.setNombre("Indira");
				usuario.setApellido("Zaldivar");
				usuario.setEmail("indi@indi");
				usuario.setDireccion("basio");
				usuario.setDni("123456789");
				usuario.setRol("admin");
				repository.save(usuario);
				System.out.println("Usuaria de prueba registrado::::" +usuario);
			}
		};
	}

}
