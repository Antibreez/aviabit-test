import { MONTHS } from "../../util/const";
import { getTime } from "../../util/date";
import { getHoursFromSec, summarizeData } from "../../util/flights";
import cl from "classnames";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function FlightYearTable(props) {
  const { flights, flight } = props;
  const [totalTime, setTotalTime] = useState(null);

  const navigate = useNavigate();

  const isEmptyMonth = (currentYear, currentMonth) => {
    const monthFlights = flights.find((flight) => flight.year === +currentYear)
      .months[currentMonth - 1].flights;

    if (monthFlights.fact.length > 0 || monthFlights.plan.length > 0) {
      return false;
    }

    return true;
  };

  const onMonthClick = (e) => {
    e.preventDefault();
    const dataYear = e.currentTarget.getAttribute("data-year");
    const dataMonth = e.currentTarget.getAttribute("data-month");

    const params = `${dataYear}-${dataMonth}`;
    navigate(`/period/${params}`);
  };

  const onYearClick = (e) => {
    e.preventDefault();
    const dataYear = e.currentTarget.getAttribute("data-year");

    const params = dataYear;
    navigate(`/year/${params}`);
  };

  const getTotalTime = (flight) =>
    getTime(
      summarizeData(
        flight.months.map((month) => {
          const sumFact = summarizeData(month.flights.fact, "timeFlight");
          const sumPlan = summarizeData(month.flights.plan, "timeFlight");

          const sum = sumFact + sumPlan > 0 ? [sumFact + sumPlan] : [0];

          return sum;
        }),
        0
      )
    );

  useEffect(() => {
    setTotalTime(getTotalTime(flight));
  }, []);

  return (
    <table className="main-table">
      <thead>
        <tr>
          <th className="empty"></th>
          <th colSpan="12">{flight.year} год</th>
          <th className="empty"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="main-table__hours-label">Часы</td>

          {MONTHS.map((month, idx) => {
            const isEmpty = isEmptyMonth(flight.year, idx + 1);

            return (
              <td key={idx} className="main-table__month-label">
                <a
                  className={cl({
                    empty: isEmptyMonth(flight.year, idx + 1),
                  })}
                  data-year={flight.year}
                  data-month={idx + 1}
                  onClick={isEmpty ? null : onMonthClick}
                >
                  {month.slice(0, 3)}
                </a>
              </td>
            );
          })}

          <td rowSpan="2" className="main-table__month-total">
            <a href="#" data-year={flight.year} onClick={onYearClick}>
              <div>Итого</div>
              <div>
                {totalTime && totalTime.hours} {totalTime && totalTime.minutes}
              </div>
            </a>
          </td>
        </tr>
        <tr>
          <td className="main-table__hours-desc">
            <div>Факт.</div>
            <div>План.</div>
          </td>
          {flight.months.map((month, indexMonth) => {
            const totalFact = summarizeData(month.flights.fact, "timeFlight");
            const totalPlan = summarizeData(month.flights.plan, "timeFlight");

            const factTime = getTime(totalFact);
            const planTime = getTime(totalPlan);

            const isPlanTime = planTime.hours && planTime.minutes;

            return (
              <td
                key={indexMonth}
                className={cl("main-table__month-value", {
                  empty: !(totalFact + totalPlan),
                })}
              >
                <span className="main-table__month-fact">
                  {factTime.hours} {factTime.minutes}
                </span>
                <br />
                <span className="main-table__month-plan">
                  {isPlanTime ? (
                    `${planTime.hours} ${planTime.minutes}`
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
              </td>
            );
          })}
          <td className="main-table__month-total main-table__month-total--mobile">
            <a href="#" data-year={flight.year} onClick={onYearClick}>
              <div>Итого</div>
              <div>
                {totalTime && totalTime.hours} {totalTime && totalTime.minutes}
              </div>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights.flights,
  };
};

export default connect(mapStateToProps)(FlightYearTable);
