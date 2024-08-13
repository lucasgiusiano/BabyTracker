const Report = ({eventName, consumedName, lastConsumedName, totalConsumed, lastEventTime}) => {
  return (
    <div className="report text-center col-12 container">
      <div className="d-flex justify-content-center align-items-center mb-2 reportTitle">
        <h3>{eventName}</h3>
      </div>
      <div className="row d-flex justify-content-around">
        <div className="reportDisplay col-11 mt-2">
          <h4>{consumedName}</h4>
          <p className="h1 mt-4">{totalConsumed}</p>
        </div>
        <div className="reportDisplay col-11 mt-4">
          <h4>{lastConsumedName}</h4>
          <p className="h1 mt-4">{lastEventTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
