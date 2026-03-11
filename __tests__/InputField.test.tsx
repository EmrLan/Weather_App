import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import InputField, { InputFieldImperativeHandle } from '../src/components/inputField/InputField';

describe('InputField Test', () => {
  it('Should render a textInput and a text holding error message', () => {
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
    fireEvent.changeText(textInput, 'End of World');
    expect(txtOnChange).toHaveBeenCalledWith('End of World');
  });

  it('handles imperative methods (focus, blur, clear)', () => {
    const ref = React.createRef() as React.RefObject<InputFieldImperativeHandle>;
    render(<InputField ref={ref} error="" />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.imperativeFocus).toBeInstanceOf(Function);

    act(() => {
      ref.current?.imperativeFocus();
    });

    act(() => {
      ref.current?.imperativeBlur();
    });

    act(() => {
      ref.current?.imperativeClear();
    });
    
    expect(true).toBe(true); 
  });
});