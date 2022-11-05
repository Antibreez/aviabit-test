import { getLocalDate, getTime, getTimeText } from "../../util/date";
import FlightStroke from "./FlightStroke";
import alert from "../../assets/img/alert.svg";
import sprite from "../../assets/img/sprite.svg";
import { FlightData } from "../../util/flights";
import { MONTHS } from "../../util/const";

function FlightInfo(props) {
  const { flights } = props;

  return (
    <div className="flight-info">
      <div className="flight-info__header">
        <div className="flight-info__header-item">Дата</div>
        {FlightData.map((str, idx) => {
          return idx === 0 ? null : (
            <div className="flight-info__header-item" key={idx}>
              <span>
                {str
                  .split("(")[0]
                  .split(" ")
                  .reduce((prev, current) => prev + current.slice(0, 1), "")
                  .toUpperCase()}
              </span>
              <div className="flight-info__header-alert">
                <svg className="flight-info__header-alert-icon">
                  <use xlinkHref={`${sprite}#alert`}></use>
                </svg>
                <span className="flight-info__header-alert-message">
                  <span>{str}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {flights.map((flight, idx) => {
        const dateData = getLocalDate(flight.dateFlight);
        const date = dateData.date;
        const time = dateData.time.split(":").slice(0, -1).join(":");
        const day = date.split(".")[0];
        const month = MONTHS[+date.split(".")[1] - 1].slice(0, 3);
        const year = date.split(".")[2];

        return (
          <div className="flight-info__item" key={idx}>
            <div className="flight-info__date">
              <div>{date}</div>
              <div>{time}</div>
            </div>
            {/* <div className="flight-info__date flight-info__date--mobile">
              <div>{day}</div>
              <div>{month}</div>
              <div>{year}</div>
              <div>{time}</div>
            </div> */}
            <div className="flight-info__body">
              <FlightStroke name={`${FlightData[idx]}`} value={flight.flight} />
              <FlightStroke
                name={`${FlightData[idx]}`}
                value={flight.pinType}
              />
              <FlightStroke
                name="Бортовой номер воздушного судна: "
                value={flight.pin}
              />
              <FlightStroke
                name="Время налета (с момента взлета до посадки): "
                value={flight.timeFlight}
                isTime={true}
              />
              <FlightStroke
                name="Полетное время (время налета + руление и работа двигателя на земле): "
                value={flight.timeBlock}
                isTime={true}
              />
              <FlightStroke
                name="Ночное летное время (является частью налета): "
                value={flight.timeNight}
                isTime={true}
              />
              <FlightStroke
                name="Биологическая ночь: "
                value={flight.timeBiologicalNight}
                isTime={true}
              />
              <FlightStroke
                name="Рабочее время (полетное время + предполетная и послеполетная подготовка): "
                value={flight.timeWork}
                isTime={true}
              />
            </div>
          </div>
        );
      })}

      <div className="flight-info__bottom">
        <div>Итого</div>
        <div className="flight-info__bottom-body">
          <div className="for-desktop"></div>
          <div className="for-desktop"></div>
          <div className="for-desktop"></div>
          <div>
            <span>{FlightData[4]}</span>
            <span>
              {getTimeText(
                flights.reduce((prev, current) => prev + current.timeFlight, 0)
              )}
            </span>
          </div>
          <div>
            <span>{FlightData[5]}</span>
            <span>
              {getTimeText(
                flights.reduce((prev, current) => prev + current.timeBlock, 0)
              )}
            </span>
          </div>
          <div>
            <span>{FlightData[6]}</span>
            <span>
              {getTimeText(
                flights.reduce((prev, current) => prev + current.timeNight, 0)
              )}
            </span>
          </div>
          <div>
            <span>{FlightData[7]}</span>
            <span>
              {getTimeText(
                flights.reduce(
                  (prev, current) => prev + current.timeBiologicalNight,
                  0
                )
              )}
            </span>
          </div>
          <div>
            <span>{FlightData[8]}</span>
            <span>
              {getTimeText(
                flights.reduce((prev, current) => prev + current.timeWork, 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightInfo;
