import { StyleSheet, TextInput } from 'react-native';

export default function InputField(props) {
  return (
    <TextInput
      style={{
        ...Styles.inputField,
        ...(props.error.length > 0 ? { borderColor: '#FF2400' } : {}),
      }}
      onChangeText={props.fn}
      value={props.value}
      placeholder="Enter City Name"
      placeholderTextColor={props.error.length > 0 ? '#FF2400' : 'white'}
      //   textAlign="center"
    />
  );
}

const Styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    padding: 20,
    color: 'white',
  },
});
