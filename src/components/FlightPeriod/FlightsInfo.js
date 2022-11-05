import FlightInfo from "./FlightInfo";

function FlightsInfo(props) {
  const { flights, type } = props;

  return (
    <div className="flight-period__block">
      {type === "fact" && <h2>Фактический налет</h2>}
      {type === "plan" && <h2>Плановый налет</h2>}
      <FlightInfo flights={flights} />
    </div>
  );
}

export default FlightsInfo;
