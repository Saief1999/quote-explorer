import './App.css';
import { Container, Typography, Box }from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import QuotesBrowser from './components/QuotesBrowser';

const theme = createTheme();

/**
 * Entry point of the application
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <QuotesBrowser />
      </Container>
    </ThemeProvider>
  );
}

export default App;
