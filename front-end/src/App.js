import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer} from "react-toastify";

// trying purpose only
import {Button} from "@mui/material";
import { CssBaseline } from "@mui/material"
import {useDispatch} from "react-redux";
import {createEvent} from "./redux/slices/authSlice";

function App() {

    const dispatch = useDispatch();

    return (
        <ThemeProvider>
            <ThemeSettings>
                {/*<Button onClick={()=> dispatch(createEvent())}>Trying Event</Button>*/}
                <CssBaseline />
                <Router/>
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
