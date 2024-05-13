import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/appSlice"
import authReducer from "./slices/authSlice";
import conversionReducer from "./slices/conversationSlice";
import messageReducer from "./slices/messagesSlice";

// slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: "redux-",
    // whitelist [],
    // blacklist [],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversionReducer,
    messages: messageReducer,
});

export {rootPersistConfig, rootReducer}

