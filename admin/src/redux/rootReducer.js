import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: "ad-redux-",
    // whitelist [],
    // blacklist [],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export { rootReducer, rootPersistConfig};