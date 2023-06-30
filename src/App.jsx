import Aos from "aos";
import 'aos/dist/aos.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routers/router'
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./Context/AuthContext";
import { createBrowserHistory } from 'history';

const App = () => {
  Aos.init({
    duration: 1800,
    offset: 0,
  });

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router history={createBrowserHistory} >
            <Routes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;