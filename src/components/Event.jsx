import { useRef } from "react";
import { deleteEventToList } from "../features/eventsSlice";
import { useDispatch } from "react-redux";

const Event = ({ EventId, Logo, Category, Desc, Date, Time }) => {
  const eventId = useRef(null);

  const dispatch = useDispatch();

  const deleteEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("ApiKey"));
    myHeaders.append("iduser", localStorage.getItem("UserId"));

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://babytracker.develotion.com/eventos.php?idEvento=${EventId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(deleteEventToList(EventId));
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="event">
      <div className="col-10 col-sm-11">
        <div className="d-flex justify-content-between align-items-center pb-1 pe-2">
          <img
            className="m-0"
            src={Logo}
            alt={"Logo de Categoria " + Category}
          />
          <h3 className="m-0">{Category}</h3>
          <p className="m-0">
            {Date} - {Time}
          </p>
        </div>
        <div className="desc">
          <p>{Desc}</p>
        </div>
      </div>

      <button className="btn col-2 col-sm-1 ms-1" title="Eliminar" onClick={deleteEvent}>
        <i className="fa-solid fa-trash-can fa-2xl"></i>
      </button>
    </div>
  );
};

export default Event;
