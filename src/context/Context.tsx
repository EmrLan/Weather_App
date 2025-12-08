import { createContext, ReactNode, useContext, useReducer } from 'react';
import CityWeatherReducer, {
  CityWeatherObj,
  payloadData,
} from '../reducer/CityWeatherReducer';

const CityWeatherContext = createContext<CityWeatherObj>({} as CityWeatherObj);
const UpdateCityWeatherContext = createContext<Dispatch>(() => {});

export function useCityWeather() {
  return useContext(CityWeatherContext);
}

export function useCityWeatherUpdate() {
  return useContext(UpdateCityWeatherContext);
}

interface propsContainer {
  children: ReactNode;
}

type Dispatch = (action: { type: string; payload: payloadData }) => void;

export function CityWeatherProvider(props: propsContainer) {
  const [state, dispatch] = useReducer(
    CityWeatherReducer,
    {} as CityWeatherObj,
  );
  return (
    <CityWeatherContext.Provider value={state}>
      <UpdateCityWeatherContext.Provider value={dispatch}>
        {props.children}
      </UpdateCityWeatherContext.Provider>
    </CityWeatherContext.Provider>
  );
}
