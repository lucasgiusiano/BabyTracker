import { useSelector } from "react-redux";
import Report from "./Report";

const Reports = () => {
  const now = new Date();
  const consumedBottles = useSelector(
    (state) => state.events.events?.filter((e) => e.idCategoria === 35 && new Date(e.fecha).getDate() == now.getDate() && new Date(e.fecha).getMonth() == now.getMonth() && new Date(e.fecha).getFullYear() == now.getFullYear()).length
  );
  const changedDiapers = useSelector(
    (state) => state.events.events?.filter((e) => e.idCategoria === 33 && new Date(e.fecha).getDate() == now.getDate() && new Date(e.fecha).getMonth() == now.getMonth() && new Date(e.fecha).getFullYear() == now.getFullYear()).length
  );
  const lastConsumedBottle = new Date() - new Date(useSelector((state) => state.events.lastBottleConsumed));
  const formatedBottleTime = `${String(Math.floor(lastConsumedBottle / (1000 * 60 * 60))).padStart(2, '0')}:${String(Math.floor((lastConsumedBottle % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}:${String(Math.floor((lastConsumedBottle % (1000 * 60)) / 1000)).padStart(2, '0')}`;
  const lastDiaperChanged = new Date() - new Date(useSelector((state) => state.events.lastDiaperChanged));
  const formatedDiaperTime = `${String(Math.floor(lastDiaperChanged / (1000 * 60 * 60))).padStart(2, '0')}:${String(Math.floor((lastDiaperChanged % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}:${String(Math.floor((lastDiaperChanged % (1000 * 60)) / 1000)).padStart(2, '0')}`;

  return (
    <div className="col-12 col-md-4 dashboardComp">
      <div className="mx-auto text-center">
        <h2 className="m-0">REPORTS</h2>
      </div>
      <hr />

      <div className="reports">
        <Report
          eventName={"Baby Bottles"}
          consumedName={"Ingested Bottles"}
          lastConsumedName={"Last Bottle Ingested"}
          totalConsumed={consumedBottles}
          lastEventTime={formatedBottleTime}
        />
        <Report
          eventName={"Diapers"}
          consumedName={"Diapers Changed"}
          lastConsumedName={"Last Diaper Changed"}
          totalConsumed={changedDiapers}
          lastEventTime={formatedDiaperTime}
        />
      </div>
    </div>
  );
};

export default Reports;
