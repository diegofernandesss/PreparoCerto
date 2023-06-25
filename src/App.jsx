import Aos from "aos";
import 'aos/dist/aos.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routers/router'
import { ThemeProvider } from "@material-tailwind/react";

const App = () => {
  Aos.init({
    duration: 1800,
    offset: 0,
  });

  return (
    <ThemeProvider>
      <Router>
          <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;