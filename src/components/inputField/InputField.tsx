import React, { useImperativeHandle, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { Colors } from '../../utils/Colors';

interface PropsContainer extends TextInputProps {
  error: string;
  txtInputStyle?: StyleProp<TextStyle>;
  errorClr?: string;
}

export type InputFieldImperativeHandle = {
  imperativeFocus: () => void;
  imperativeClear: () => void;
  imperativeBlur: () => void;
};

function InputField(
  { error = '', txtInputStyle, errorClr = 'red', ...rest }: PropsContainer,
  ref: React.Ref<InputFieldImperativeHandle>,
) {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        imperativeFocus: () => inputRef.current?.focus(),
        imperativeBlur: () => inputRef.current?.blur(),
        imperativeClear: () => inputRef.current?.clear(),
      };
    },
    [],
  );

  return (
    <View>
      <TextInput
        ref={inputRef}
        style={[
          txtInputStyle ? txtInputStyle : Styles.inputField,
          error.length > 0
            ? {
                borderColor: errorClr,
                color: errorClr,
                alignSelf: 'flex-start',
              }
            : null,
        ]}
        {...rest}
      />
      <Text
        style={{
          ...Styles.errMsg,
          ...(error.length > 0
            ? {
                color: errorClr,
              }
            : null),
        }}
      >
        {error}
      </Text>
    </View>
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
  errMsg: {
    paddingTop: 2,
    paddingLeft: 20,
    color: Colors.secondary,
  },
});

export default React.forwardRef(InputField);
