import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFlights } from "./redux/actions/flights";
import {
  groupSortedFlightsByMonth,
  groupSortedFlightsByYears,
  sortFlightsByDate,
  summarizeData,
} from "./util/flights";

function App(props) {
  const { flights, fetchFlights } = props;

  useEffect(() => {
    fetchFlights().then((res) => {
      // console.log(flights);
      // console.log(groupSortedFlightsByYears(flights));
      // console.log(summarizeData(flights, "timeFlight"));
    });
  }, []);

  return (
    <div>
      {flights && console.log(groupSortedFlightsByMonth(flights))}
      {flights &&
        groupSortedFlightsByMonth(flights).map((flight, index) => (
          <div key={index}>
            <h2>{flight.year}</h2>

            {console.log(flight.months)}

            {flight.months.map((month, idx) => (
              <div key={idx}>
                <h2>{month.month}</h2>
              </div>
            ))}

            <hr />
          </div>
        ))}
      {/* {flights
        ? groupSortedFlightsByYears(flights).map((yearGroup, idy) => (
            
            // return (
            //   <div key={idy}>
            //     <h1>
            //       {yearGroup[0].dateFlight.split("-")[0]} Итого:
            //       {summarizeData(yearGroup, "timeFlight")}
            //     </h1>

            //     {groupSortedFlightsByMonth(yearGroup).map((monthGroup, idm) => {
            //       console.log(monthGroup);
            //       return (
            //         <p key={idy * 10 + idm}>
            //           {monthGroup[0].dateFlight.split("-")[1]} Итого:
            //           {summarizeData(monthGroup, "timeFlight")}
            //         </p>
            //       );
            //     })}
            //   </div>
            // );
          ))
        : "loading...."} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights.flights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlights: (value) => dispatch(fetchFlights(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
