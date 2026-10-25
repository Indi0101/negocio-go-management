import { request, setAccessToken } from "./conexion";   
const idPath = (id) => encodeURIComponent(String(id));

function crud(basePath) {
  return {
    listar: () => request(basePath),

    obtener: (id) =>
      request(`${basePath}/${idPath(id)}`),

    crear: (datos) =>
      request(basePath, { method: "POST", body: datos }),

    actualizar: (id, datos) =>
      request(`${basePath}/${idPath(id)}`, {
        method: "PUT",
        body: datos,
      }),

    eliminar: (id) =>
      request(`${basePath}/${idPath(id)}`, {
        method: "DELETE",
      }),
  };
}
export const authApi = {
  async login(credenciales) 
  {
    const data = await request("/api/auth/login", { method: "POST",body: credenciales,});

    // Ajustar al nombre real del campo que devuelve Spring Boot.
    if (!data?.token) {
      throw new Error("El login no devolvió accessToken");
    }

    setAccessToken(data.token);
    return data;
  },

  registrar: (datos) => request("/api/auth/register", { method: "POST", body: datos,}),

  cerrarSesion() { setAccessToken(null); },
};

export const usuariosApi = crud("/api/usuarios");
export const productosApi = crud("/api/productos");

export const comprasApi =
 {
  listar: () => request("/api/compras"),
  obtener: (id) => request(`/api/compras/${idPath(id)}`),
  crear: (datos) => request("/api/compras", {method: "POST",body: datos, }),
};