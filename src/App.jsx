//rafce (Genera la funcion necesaria para el componente)

import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Content from "./components/Content";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />}>
            <Route path="/" element={<Login/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </Provider>
  );
};

export default App;
