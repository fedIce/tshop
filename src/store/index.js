import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { authReducer } from './reducers/authReducers';
import { themeReducer } from './reducers/themeReducers';



const persistConfig = {
    key:'root',
    storage,
    whitelist: ['user', 'theme']
}

const RootReducer = combineReducers({
    user: authReducer,
    theme: themeReducer,
})

export default persistReducer(persistConfig, RootReducer)