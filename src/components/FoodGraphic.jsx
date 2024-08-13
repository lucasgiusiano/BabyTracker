import React from "react";
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
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

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
      text: "Registered food events in the last week",
    },
  },
};

const now = new Date();
const getLastWeekFoodEvents = createSelector(
  (state) => state.events.events,
  (events) =>
    events.filter(
      (e) =>
        new Date(e.fecha) <= now &&
        new Date(e.fecha) >= new Date(new Date().setDate(now.getDate() - 5)) &&
        e.idCategoria == 31
    )
);

const FoodGraphic = () => {
  const lastWeekFoodEvents = useSelector(getLastWeekFoodEvents);

  const last7Days = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() - i)),
  })).reverse();

  const lastWeekFoodEventsCounted = last7Days.map((day) => {
    const eventsInDay = lastWeekFoodEvents.filter(
      (e) => new Date(e.fecha).getDate() === new Date(day.date).getDate()
    ).length;
    return { ...day, eventsInDay };
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="col-11 col-md-4 mb-md-0 mb-4 staticsComp">
      <Bar
      className="w-75 mx-auto"
        options={options}
        data={{
          labels: lastWeekFoodEventsCounted.map(
            (day) => daysOfWeek[day.date.getDay()]
          ),
          datasets: [
            {
              data: lastWeekFoodEventsCounted.map((day) => day.eventsInDay),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default FoodGraphic;
