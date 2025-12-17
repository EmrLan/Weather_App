import { fireEvent, render, screen } from '@testing-library/react-native';
import InputField from '../src/components/inputField/InputField';

describe('BtnWithIconAtTop Test', () => {
  it('Should render a textInput and a text holding error message, error message provided as prop', () => {
    const txtOnChange = jest.fn();
    render(
      <InputField
        error={'Invalid Input!'}
        placeholder="Type here..."
        value="Hello World"
        onChangeText={txtOnChange}
      />,
    );
    expect(screen.getByText('Invalid Input!')).toBeTruthy();
    const textInput = screen.getByPlaceholderText('Type here...');
    expect(textInput).toBeTruthy();
    expect(textInput.props.value).toBe('Hello World');
    fireEvent.changeText(textInput, 'End of World');
    expect(txtOnChange).toHaveBeenCalledWith('End of World');
  });
});
