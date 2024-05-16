import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer} from "react-toastify";

// trying purpose only
import {Alert, CssBaseline, Snackbar} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {connectWithSocketServer} from "./utils/wss";
import {closeSnackBar} from "./redux/slices/appSlice";

const vertical = "top";
const horizontal = "center";

function App() {
    const {token} = useSelector(store => store.auth)

    const dispatch = useDispatch();

    const {severity, message, open} = useSelector(store => store.app.snackbar);

    useEffect(() => {
        connectWithSocketServer(token);
    }, [])

    return (
        <>
            <ThemeProvider>
                <ThemeSettings>
                    {/*<Button onClick={()=> dispatch(createEvent())}>Trying Event</Button>*/}
                    <CssBaseline/>
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

            {
                message && open ? (
                    <Snackbar
                        anchorOrigin={{vertical, horizontal}}
                        open={open}
                        autoHideDuration={4000}
                        key={vertical + horizontal}
                        onClose={() => dispatch(closeSnackBar())}
                    >
                        <Alert
                            onClose={() => dispatch(closeSnackBar())}
                            severity={severity}
                            sx={{width: "100%"}}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                ) : (<></>)
            }
        </>
    );
}

export default App;
