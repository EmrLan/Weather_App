import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CurrentWeatherData } from '../../views/AppContainer';
import { Colors } from '../../utils/Colors';
import React, { useImperativeHandle, useRef } from 'react';

interface PropsContainer {
  error: string;
  value: string;
  fn: (value: string) => void;
  submitFn?: () => void;
  placeholder: string;
}

type InputFieldImperativeHandle = {
  imperativeClear: () => void;
  imperativeBlur: () => void;
};

function InputField(
  props: PropsContainer,
  ref: React.Ref<InputFieldImperativeHandle>,
) {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        imperativeBlur: () => inputRef.current?.blur(),
        imperativeClear: () => inputRef.current?.clear(),
      };
    },
    [props.value],
  );

  return (
    <TextInput
      ref={inputRef}
      style={{
        ...Styles.inputField,
        ...(props.error.length > 0
          ? {
              borderColor: Colors.secondary,
              color: Colors.secondary,
              alignSelf: 'flex-start',
            }
          : {}),
      }}
      onChangeText={props.fn}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={
        props.error.length > 0 ? Colors.secondary : Colors.secondary
      }
      onSubmitEditing={props.submitFn}
      returnKeyType={'done'}
    />
  );
}

const Styles = StyleSheet.create({
  inputField: {
    width: 250,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 30,
    padding: 20,
    color: Colors.secondary,
  },
});

export default React.forwardRef(InputField);
