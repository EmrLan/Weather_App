declare module 'react-native-config' {
  interface BuildConfig {
    OPEN_WEATHER_KEY: string;
  }

  const Config: BuildConfig;
  export default Config;
}
