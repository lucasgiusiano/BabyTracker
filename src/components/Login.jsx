import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const user = useRef(null);
  const pass = useRef(null);

  const navigate = useNavigate();

  const log_in = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      usuario: user.current.value,
      password: pass.current.value,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    fetch("https://babytracker.develotion.com/login.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo == 200) {
          localStorage.setItem("ApiKey", result.apiKey);
          localStorage.setItem("UserId", result.id);
          navigate("/dashboard");
          toast.success("Welcome, " + raw.usuario);
        } else {
          toast.error("You must complete all fields");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="loginComp">
      <div className="loginCard mx-auto">
        <h2 className="m-0">Inicio de Sesión</h2>
        <hr />
        <div action="POST">
          <div>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Usuario"
              ref={user}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Contraseña"
              ref={pass}
            />
          </div>
          <button className="form-control login btn-login" onClick={log_in}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
