import { configureStore } from "@reduxjs/toolkit";
import {authReducer,projectReducer} from "@/redux";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        project:projectReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;