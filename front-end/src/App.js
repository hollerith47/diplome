import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer} from "react-toastify";

// trying purpose only
import { CssBaseline } from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {connectWithSocketServer} from "./utils/wss";

function App() {
    const { token } = useSelector(store => store.auth)

    const dispatch = useDispatch();

    useEffect(()=>{
        connectWithSocketServer(token);
    }, [])

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
