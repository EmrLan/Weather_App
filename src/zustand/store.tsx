import { create } from 'zustand';

type State = {
  latitude: number;
  longitude: number;
  setCoords: (lat: number, long: number) => void;
};

 const useWatchLocation = create<State>(set => ({
  latitude: 0,
  longitude: 0,
  setCoords: (lat, long) =>
    set(() => ({ latitude: lat, longitude: long })),
}));


export default useWatchLocation;