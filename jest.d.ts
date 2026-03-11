import 'react-native';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeFocused(): R;
      toBeDisabled(): R;
      toBeEmptyElement(): R;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toContainElement(element: ReactTestInstance | null): R;
      toHaveProp(prop: string, value?: any): R;
      toHaveStyle(style: object[] | object): R;
      toHaveAccessibilityState(state: object): R;
      toHaveAccessibilityValue(value: object): R;
    }
  }
}