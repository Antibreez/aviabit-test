import { connect } from "react-redux";
import FlightYearTable from "../components/Main/FlightYearTable";

function Main(props) {
  const { flights } = props;

  return (
    <div className="main-page">
      <div className="container">
        <h1>Данные о налете сотрудника</h1>
        {flights ? (
          flights.map((flight, indexYear) => (
            <FlightYearTable key={indexYear} flight={flight} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights.flights,
  };
};

export default connect(mapStateToProps)(Main);
