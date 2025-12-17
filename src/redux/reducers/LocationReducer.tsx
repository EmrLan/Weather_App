import { SET_LOCATION } from '../actions/ActionTypes';

interface LocationState {
  cityName: string;
}

const initialState: LocationState = { cityName: 'Las Vegas 2.0' };

export default function LocationReducer(
  state: LocationState = initialState,
  action: any,
) {
  switch (action.type) {
    case SET_LOCATION: {
      return {...state, cityName: action.payload };
    }
    default: {
      return state;
    }
  }
}
