import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { departamentsList } from "../features/departamentsSlice";
import { citiesList } from "../features/citiesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loguedUser } from "../features/userSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const departaments = useSelector((state) => state.departaments.departaments);
  const cities = useSelector((state) => state.cities.cities);

  const user = useRef(null);
  const pass = useRef(null);
  const dept = useRef(null);
  const city = useRef(null);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://babytracker.develotion.com//departamentos.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(departamentsList(result.departamentos));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const chargeCities = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://babytracker.develotion.com//ciudades.php?idDepartamento=${dept.current.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(citiesList(result.ciudades));
      })
      .catch((error) => console.log("error", error));
  };

  const signinNewUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      usuario: user.current.value.trim(),
      password: pass.current.value.trim(),
      idDepartamento: dept.current.value,
      idCiudad: city.current.value,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    if (
      raw.usuario != "" &&
      raw.password != "" &&
      raw.idDepartamento != -1 &&
      raw.idCiudad != -1
    ) {
      fetch("https://babytracker.develotion.com//usuarios.php", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.codigo == 200) {
            localStorage.setItem("ApiKey", result.apiKey);
            localStorage.setItem("UserId", result.id);
            dispatch(loguedUser(result.id))
            navigate("/dashboard");
          } else {
            toast.error("The user or password does not exist");
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("You must complete all fields");
    }
  };

  return (
    <div className="singInComp">
      <div className="singInCard mx-auto">
        <h2 className="m-0">Registrarme</h2>
        <hr />
        <div>
          <div>
            <input
              className="form-control"
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

            <select className="form-select" ref={dept} onChange={chargeCities}>
              <option value={-1}>Select your departament</option>
              {departaments.map((departament) => (
                <option value={departament.id} key={"dept" + departament.id}>
                  {departament.nombre}
                </option>
              ))}
            </select>

            <select className="form-select" ref={city} onChange={chargeCities}>
              <option value={-1}>Select your city</option>

              {cities.map((city) => (
                <option value={city.id} key={"city" + city.id}>
                  {city.nombre}
                </option>
              ))}
            </select>
          </div>
          <button className="form-control btn-signin" onClick={signinNewUser}>
            Registrarme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
