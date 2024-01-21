import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer} from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <Router />
          <ToastContainer
              position={"top-center"}
              autoClose={4000}
              transition={Bounce}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
          />
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
