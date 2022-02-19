import React from 'react';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import {lightTheme, darkTheme, GlobalStyles, Container} from './themes';

const moonIcon = <Icon name="moon-o" size={36} color="#ccc" />;
const sunIcon = <Icon name="sun-o" size={36} color="#333" />;

const App = () => {
  const [scheme, setScheme] = React.useState(useColorScheme());

  return (
    <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <Container>
          <TouchableOpacity
            onPress={() => setScheme(scheme === 'dark' ? 'light' : 'dark')}>
            {scheme === 'dark' ? moonIcon : sunIcon}
          </TouchableOpacity>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default App;
