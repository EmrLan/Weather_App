import { combineReducers, createStore } from 'redux';
import WeatherReducer from './reducers/WeatherReducer';
import LocationReducer from './reducers/LocationReducer';

export const rootReducer = combineReducers({
  // The key here determines the key in your final state object
  Weather: WeatherReducer,
  Location: LocationReducer,
});

const Store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default Store;
