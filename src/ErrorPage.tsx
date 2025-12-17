import { Children, Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Background from './components/layouts/Background';
import { Colors } from './utils/Colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Background>
          <View style={styles.container}>
            <Text style={styles.errorText}>OUPS...</Text>
            <Text style={styles.txtClr}>Something went wrong.</Text>
            <Text style={styles.txtClr}>Please restart the app.</Text>
          </View>
        </Background>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 10,
  },
  txtClr: {
    color: Colors.secondary,
    marginBottom: 10,
  },
});

export default ErrorPage;
