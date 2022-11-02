import { SET_FLIGHTS } from "../actions/actionTypes";

const initialState = {
  flights: null,
};

const flights = (state = initialState, action) => {
  switch (action.type) {
    case SET_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
      };
    default:
      return state;
  }
};

export default flights;
