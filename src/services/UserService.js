import axios from "axios";

export class UsuarioService {
  // baseUrl = "http://localhost:8080/api/products/";
  baseUrl = "http://localhost:8080/api/usuarios/";

  autenticar(credentials) {
    return axios
      .post(this.baseUrl + "autenticar/", credentials)
      .then((res) => res.data);
  }
}
