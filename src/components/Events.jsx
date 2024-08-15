import Event from "./Event";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventToList } from "../features/eventsSlice";
import { toast } from "react-toastify";

const Events = () => {
  const dispatch = useDispatch();
  const unsortedEvents = useSelector((state) => state.events.events);
  const [events, setEvents] = useState([]);
  const categories = useSelector((state) => state.categories.categories);

  const categorie = useRef(null);
  const datetime = useRef(null);
  const description = useRef(null);

  const addNewEvent = () => {
    let cat = categorie.current.value;
    let desc = description.current.value;
    let dTime =
      datetime.current.value.substring(0, 10) +
      " " +
      datetime.current.value.substring(11) +
      ":00";
    let actualDate = new Date();

    if (new Date(dTime) <= actualDate && cat != -1) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("apikey", localStorage.getItem("ApiKey"));
      myHeaders.append("iduser", localStorage.getItem("UserId"));

      let raw = {
        idCategoria: parseInt(cat),
        idUsuario: parseInt(localStorage.getItem("UserId")),
        detalle: desc,
        fecha: dTime,
      };

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
      };

      fetch("https://babytracker.develotion.com//eventos.php", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.codigo == 200) {
            let id = result.idEvento;
            dispatch(addEventToList({ id, ...raw }));
            toast.success("Event created successfully");
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("You must complete all fields");
    }
  };

  const showAllEvents = () => {
    setEvents(
      [...unsortedEvents].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    );
  };

  const showTodayEvents = () => {
    let now = new Date();
    setEvents(
      [...unsortedEvents]
        .filter(
          (e) =>
            new Date(e.fecha).getDate() == now.getDate() &&
            new Date(e.fecha).getMonth() == now.getMonth() &&
            new Date(e.fecha).getFullYear() == now.getFullYear()
        )
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    );
  };

  const showPreviousEvents = () => {
    let now = new Date();
    setEvents(
      [...unsortedEvents]
        .filter(
          (e) =>
            new Date(e.fecha).getDate() < now.getDate() &&
            new Date(e.fecha).getMonth() == now.getMonth() &&
            new Date(e.fecha).getFullYear() == now.getFullYear()
        )
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    );
  };

  useEffect(() => {
    setEvents(
      [...unsortedEvents].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    );
  }, [unsortedEvents]);

  return (
    <div className="col-12 col-md-7 mb-4 mb-md-0 dashboardComp">
      <div className="dashboardOps mx-auto">
        <h2 className="text-center m-0">EVENTS</h2>
        <hr />
        <ul className="nav">
          <li className="nav-item col-12 col-lg-3 mb-3 mb-lg-0 me-0 me-lg-4 text-center">
            <input
              type="button"
              className="nav-link mx-auto"
              value="All Events"
              onClick={showAllEvents}
            />
          </li>
          <li className="nav-item col-12 col-lg-3 mb-3 mb-lg-0 me-0 me-lg-4 text-center">
            <input
              type="button"
              className="nav-link mx-auto"
              value="Today's Events"
              onClick={showTodayEvents}
            />
          </li>
          <li className="nav-item col-12 col-lg-3 mb-lg-0 me-0 text-center">
            <input
              type="button"
              className="nav-link mx-auto"
              value="Previous Events"
              onClick={showPreviousEvents}
            />
          </li>
        </ul>
      </div>
      <hr />
      <div className="events">
        {events.map((event) => (
          <Event
            key={event.id}
            EventId={event.id}
            Logo={
              "https://babytracker.develotion.com/imgs/" +
              categories.find((cat) => cat.id === event.idCategoria)?.imagen +
              ".png"
            }
            Category={
              categories.find((cat) => cat.id === event.idCategoria)?.tipo
            }
            Desc={event.detalle}
            Date={event.fecha.substring(0, 10)}
            Time={event.fecha.substring(10, 16)}
          />
        ))}
      </div>
      <ul className="nav d-flex justify-content-end mt-3">
        <li className="nav-item m-0 col-12 btn-add">
          <button
            type="button"
            className="nav-link col-12"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add New
          </button>
        </li>
      </ul>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add a new event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <select className="form-select" ref={categorie}>
                <option value={-1}>Select a type of event</option>
                {categories.map((cat) => (
                  <option key={cat.id + cat.tipo} value={cat.id}>
                    {cat.tipo}
                  </option>
                ))}
              </select>
              <label className="col-12 mb-2">
                Datetime
                <input
                  className="form-control"
                  type="datetime-local"
                  ref={datetime}
                  max={new Date().toISOString().substring(0, 19)}
                />
              </label>

              <input
                className="form-control mb-2"
                type="text"
                placeholder="Event Description"
                ref={description}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={addNewEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
