import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import FlightInfo from "../components/FlightPeriod/FlightInfo";
import FlightsInfo from "../components/FlightPeriod/FlightsInfo";
import { getFullMonthByIndex } from "../util/date";
import cl from "classnames";

function FlightPeriod(props) {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const params = useParams();
  const { flights } = props;

  const onTabClick = (e) => {
    if (e.currentTarget.classList.contains("active")) {
      return;
    }

    const tab = e.currentTarget.getAttribute("data-tab");
    setActiveTab(tab);
  };

  useEffect(() => {
    const periodParams = params.period;
    const yearParam = +periodParams.split("-")[0];
    const monthParam = +periodParams.split("-")[1];

    setCurrentYear(yearParam);
    setCurrentMonth(monthParam);

    if (flights) {
      try {
        const monthsItem = flights.find((flight) => {
          return flight.year === yearParam;
        }).months;

        const monthItem = monthsItem.find(
          (month) => month.month === monthParam
        ).flights;

        if (monthItem.fact.length > 0) {
          setActiveTab("fact");
        } else if (monthItem.plan.length > 0) {
          setActiveTab("plan");
        }

        setCurrentPeriod(monthItem);
      } catch {
        console.log("error");
      }
    }
  }, [flights]);

  return (
    <>
      {currentPeriod ? (
        <div className="flight-period">
          <div className="flight-period__container container">
            <h1>
              {getFullMonthByIndex(currentMonth)} {currentYear} года
            </h1>

            <div className="flight-period__body">
              {currentPeriod.fact.length > 0 &&
              currentPeriod.plan.length > 0 ? (
                <div className="flight-period__tabs">
                  <button
                    data-tab="fact"
                    className={cl("flight-period__tab", {
                      active: activeTab === "fact",
                    })}
                    onClick={onTabClick}
                  >
                    Фактический налет
                  </button>
                  <button
                    data-tab="plan"
                    className={cl("flight-period__tab", {
                      active: activeTab === "plan",
                    })}
                    onClick={onTabClick}
                  >
                    Плановый налет
                  </button>
                </div>
              ) : null}

              {activeTab === "fact" ? (
                <FlightsInfo flights={currentPeriod.fact} type="fact" />
              ) : activeTab === "plan" ? (
                <FlightsInfo flights={currentPeriod.plan} type="plan" />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights.flights,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchFlights: (value) => dispatch(fetchFlights(value)),
//   };
// };

export default connect(mapStateToProps)(FlightPeriod);
