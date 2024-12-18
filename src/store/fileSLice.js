import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    main: { headers: [], data: [] },
    inclusion: { headers: [], data: [] },
    exclusion: { headers: [], data: [] },
    finalData: { headers: [], data: [] },
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setMainFile(state, action) {
            state.main.headers = action.payload.headers;
            state.main.data = action.payload.data;
        },
        setInclusionFile(state, action) {
            state.inclusion.headers = action.payload.headers;
            state.inclusion.data = action.payload.data;
        },
        setExclusionFile(state, action) {
            state.exclusion.headers = action.payload.headers;
            state.exclusion.data = action.payload.data;
        },
        setFinalData: (state, action) => {
            state.finalData.headers = action.payload.headers;
            state.finalData.data = action.payload.data;
        },
        editRow: (state, action) => {
            const { key, rowIndex, updatedRow } = action.payload;
            if (state[key] && state[key].data) {
                state[key].data[rowIndex] = updatedRow;
            }
        },
        deleteRow: (state, action) => {
            const { key, rowIndex } = action.payload;
            if (state[key] && state[key].data) {
                state[key].data = state[key].data.filter((_, index) => index !== rowIndex);
            }
        },
    },
});

export const {
    setMainFile,
    setInclusionFile,
    setExclusionFile,
    setFinalData,
    editRow,
    deleteRow
} = fileSlice.actions;

export default fileSlice.reducer;
