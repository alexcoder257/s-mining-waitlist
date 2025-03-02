import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducer";

export const makeStore = ()=>{
    return configureStore({
        reducer: rootReducers,
      });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];