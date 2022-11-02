import { getFlights } from "../../firebase/firebase";
import { SET_FLIGHTS } from "./actionTypes";

export const fetchFlights = () => async (dispatch) => {
  getFlights
    .then((flights) => {
      dispatch({
        type: SET_FLIGHTS,
        payload: flights,
      });
    })
    .catch((e) => console.log(e));
};
