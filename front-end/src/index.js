import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";
import App from "./App";
import './app.css';
import reportWebVitals from "./reportWebVitals";
import {persistor, store} from "./redux/store";
import {Provider as ReduxProvider} from "react-redux"


// contexts
import SettingsProvider from "./contexts/SettingsContext";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
        <HelmetProvider>
            <ReduxProvider store={store}>
                {/*<PersistGate persistor={persistor} loading={null}>*/}
                    <SettingsProvider>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </SettingsProvider>
                {/*</PersistGate>*/}
            </ReduxProvider>
        </HelmetProvider>
    // {/*</React.StrictMode>*/}
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
