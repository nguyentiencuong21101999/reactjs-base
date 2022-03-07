import { colors } from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';
const theme = createTheme({
  palette: {
    background: {
      default: '#fff',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#ff8585',
    },
    text: {
      primary: '#333',
      secondary: '#7a7a7a'
    }
  },
  zIndex:{
    drawer:900,
    appBar:800
  },
  shadows,
  typography
});

export default theme;
