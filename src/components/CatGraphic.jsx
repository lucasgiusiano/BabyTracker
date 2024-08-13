import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Registered events by category",
    },
  },
};

// Utilicé este metodo con createSelector porque el selector dentro de useSelector devuelve un nuevo objeto o array cada vez que se ejecuta, incluso cuando los parámetros de entrada (el estado en este caso) no han cambiado. Esto puede llevar a renderizados innecesarios del componente y el navegador advertia de esto.
const selectCategoriesWithEvents = createSelector(
  [(state) => state.categories.categories, (state) => state.events.events],
  (categories, events) =>
    events
      .map((e) => {
        const category = categories.find((c) => c.id == e.idCategoria);
        const eventCount = events.filter((e) => e.idCategoria == category?.id).length;

        return { ...category, eventCount };
      })
      .filter(
        (categoria, index, self) =>
          index === self.findIndex((c) => c.tipo === categoria.tipo)
      )
);

const CatGraphic = () => {
  const categoriesWithEvents = useSelector(selectCategoriesWithEvents);

  return (
    <div className="col-11 col-md-4 mb-4 mb-md-0 staticsComp">
      <Bar
      className="w-75 mx-auto"
        options={options}
        data={{
          labels: categoriesWithEvents.map((c) => c.tipo),
          datasets: [
            {
              data: categoriesWithEvents.map((c) => c.eventCount),
              backgroundColor: "rgba(0, 119, 128, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default CatGraphic;
