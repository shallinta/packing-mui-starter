import React from 'react';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      light: '#ff79b0',
      main: pink.A200,
      dark: '#c60055',
      contrastText: '#fff'
    },
    error: red
  }
});

class ThemeProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        {children}
      </MuiThemeProvider>
    );
  }
}

export default ThemeProvider;
