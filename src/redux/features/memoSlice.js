import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] }; // 初期値 84

export const memoSlice = createSlice({
    name: "memo",
    initialState,
    reducers: {
        setMemo: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;