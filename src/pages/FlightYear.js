import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Canvas from "../components/FlightYear/Canvas";

function FlightYear(props) {
  const [yearFlights, setYearFlights] = useState(null);

  const { flights } = props;

  const ref = useRef(null);
  const params = useParams();

  useEffect(() => {
    console.log(flights);

    if (flights) {
      const currentFlights = flights.find((flight) => {
        return flight.year === +params.year;
      });

      setYearFlights(currentFlights);
    }
  }, [flights]);

  return (
    <div className="flight-year">
      <div className="container" ref={ref}>
        {yearFlights ? (
          <Canvas
            containerRef={ref}
            months={yearFlights.months}
            year={+params.year}
          />
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights.flights,
  };
};

export default connect(mapStateToProps)(FlightYear);
