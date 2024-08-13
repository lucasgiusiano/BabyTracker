import React, { useEffect } from "react";
import Events from "./Events";
import Reports from "./Reports";
import Graphics from "./Graphics";
import { useDispatch, useSelector } from "react-redux";
import { categoriesList } from "../features/categoriesSlice";
import { useNavigate } from "react-router-dom";
import {
  lastBottleConsumed,
  lastDiaperChanged,
  eventsList,
} from "../features/eventsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector(state => state.events.events);

  useEffect(() => {
    if (localStorage.getItem("UserId") === null) {
      navigate("/");
    } else {
      fetch("https://babytracker.develotion.com/categorias.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("ApiKey"),
          idUser: parseInt(localStorage.getItem("UserId")),
        },
      })
        .then((r) => r.json())
        .then((data) => {
          dispatch(categoriesList(data.categorias));
        });

        fetch(
          `https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem(
            "UserId"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apikey: localStorage.getItem("ApiKey"),
              idUser: parseInt(localStorage.getItem("UserId")),
            },
          }
        )
          .then((r) => r.json())
          .then((data) => {
            dispatch(eventsList(data.eventos));
          });
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem(
        "UserId"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("ApiKey"),
          idUser: parseInt(localStorage.getItem("UserId")),
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        let now = new Date();
        dispatch(
          lastBottleConsumed(
            data.eventos
              .filter((e) => e.idCategoria == 35)
              .reduce((closest, current) => {
                const currentDiff = Math.abs(new Date(current.fecha) - now);
                const closestDiff = Math.abs(new Date(closest.fecha) - now);
                return currentDiff < closestDiff ? current : closest;
              }, data.eventos[0]).fecha
          )
        );
        dispatch(
          lastDiaperChanged(
            data.eventos
              .filter((e) => e.idCategoria == 33)
              .reduce((closest, current) => {
                const currentDiff = Math.abs(new Date(current.fecha) - now);
                const closestDiff = Math.abs(new Date(closest.fecha) - now);
                return currentDiff < closestDiff ? current : closest;
              }, data.eventos[0]).fecha
          )
        );
      });
  }, [events]);

  return (
    <div className="dashboard mx-auto ">
      <div className="mx-auto py-4 d-flex container row justify-content-md-between ">
        <Events />
        <Reports />
        <Graphics/>
      </div>
    </div>
  );
};

export default Dashboard;
