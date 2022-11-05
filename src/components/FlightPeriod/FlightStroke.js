import { getTime } from "../../util/date";

function FlightStroke(props) {
  const { name, value, isTime } = props;
  const timeData = isTime ? getTime(value) : null;

  const hours = isTime ? `${timeData.hours} ` : "";
  const minutes = isTime ? `${timeData.minutes}` : "";

  return (
    <div className="flight-info__stroke">
      <span>{name}</span>
      <span>{isTime ? `${hours}${minutes}` : value}</span>
    </div>
  );
}

export default FlightStroke;
