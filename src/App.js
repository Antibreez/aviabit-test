import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightPeriod from "./pages/FlightPeriod";
import Main from "./pages/Main";
import { fetchFlights, setFlights } from "./redux/actions/flights";
import mock from "./mock/flights-mock";
import FlightYear from "./pages/FlightYear";

function App(props) {
  const { fetchFlights, setFlights } = props;

  useEffect(() => {
    fetchFlights();
    // setFlights(mock);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/period/:period" element={<FlightPeriod />} />
        <Route path="/year/:year" element={<FlightYear />} />
      </Routes>
    </BrowserRouter>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     flights: state.flights.flights,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlights: (value) => dispatch(fetchFlights(value)),
    setFlights: (value) => dispatch(setFlights(value)),
  };
};

export default connect(null, mapDispatchToProps)(App);
