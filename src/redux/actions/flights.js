import { getFlights } from "../../firebase/firebase";
import { groupSortedFlightsByData } from "../../util/flights";
import { SET_FLIGHTS } from "./actionTypes";

export const fetchFlights = () => async (dispatch) => {
  getFlights
    .then((flights) => {
      dispatch(setFlights(flights));
    })
    .catch((e) => console.log(e));
};

export const setFlights = (flights) => {
  return {
    type: SET_FLIGHTS,
    payload: groupSortedFlightsByData(flights),
  };
};
