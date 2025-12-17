import { render, screen } from '@testing-library/react-native';
import DayBtn from '../src/components/buttons/DayBtn';

describe('BtnWithIconAtTop Test', () => {
  it('Should render a button with day, icon, max temp, and min temp provided through props', () => {
    render(
      <DayBtn
        data={['MockDay', { icon: { '1n': 2, '2n': 1 }, minT: 2, maxT: 45 }]}
      />,
    );
    expect(screen.getByText('MockDay')).toBeTruthy();
    expect(screen.getByText('45° / 2°')).toBeTruthy();
    const imageCurDay = screen.queryByTestId('cur-icon-image');
    expect(imageCurDay).toBeFalsy();
    const imageDay = screen.queryByTestId('other-icon-image');
    expect(imageDay).toBeTruthy();
    expect(imageDay?.props.source).toEqual({
      uri: 'https://openweathermap.org/img/wn/1n@4x.png',
    });
  });
  it('Should render a today button with day, icon, max temp, and min temp provided through props', () => {
    render(
      <DayBtn
        data={[
          'curDay',
          { icon: { '4n': 1, '5n': 3 }, minT: 34, maxT: 97, current: true },
        ]}
      />,
    );
    expect(screen.getByText('curDay')).toBeTruthy();
    expect(screen.getByText('97° / 34°')).toBeTruthy();
    const imageCurDay = screen.queryByTestId('cur-icon-image');
    expect(imageCurDay).toBeTruthy();
    expect(imageCurDay?.props.source).toEqual({
      uri: 'https://openweathermap.org/img/wn/5n@4x.png',
    });
    const imageDay = screen.queryByTestId('other-icon-image');
    expect(imageDay).toBeFalsy();
  });
});
