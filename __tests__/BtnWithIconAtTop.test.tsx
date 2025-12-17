import { render, screen } from '@testing-library/react-native';
import BtnWithIconAtTop from '../src/components/buttons/BtnWithIconAtTop';

describe('BtnWithIconAtTop Test', () => {
  it('Should render a button with name, icon, and  provided through props', () => {
    render(<BtnWithIconAtTop name={'Test'} data={'30 %'} icon={require('')} />);
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('30 %')).toBeTruthy();
    const imageComponent = screen.getByTestId('icon-image');
    expect(imageComponent.props.source).toEqual(require(''));
  });
});
