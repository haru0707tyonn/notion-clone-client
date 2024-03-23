// npm install @reduxjs/toolkit   npm install react-redux --force　で強制インストールした   70

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        memo: memoReducer,
    },
});