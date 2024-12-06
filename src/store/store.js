import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import fileReducer from './fileSLice';
import sessionStorage from 'redux-persist/lib/storage/session';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const rootReducer = combineReducers({
    file: fileReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,

});

const persistor = persistStore(store);

export { store, persistor };