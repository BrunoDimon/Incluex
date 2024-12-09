import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headers: [],
    data: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setHeaders: (state, action) => {
            state.headers = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        editRow: (state, action) => {
            const { rowIndex, updatedRow } = action.payload;
            state.data = state.data.map((row, index) =>
                index === rowIndex ? updatedRow : row
            );
        },
        deleteRow: (state, action) => {
            state.data = state.data.filter((_, index) => index !== action.payload);
        },
    },
});

export const { setHeaders, setData, editRow, deleteRow } = dataSlice.actions;

export default dataSlice.reducer;