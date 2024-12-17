import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    main: { headers: [], data: [] },
    inclusion: { headers: [], data: [] },
    exclusion: { headers: [], data: [] },
    finalData: { headers: [], data: [] },
};

const mergeData = (main = [], inclusion = [], exclusion = []) => {
    const arraysAreEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((value, index) => value === arr2[index]);
    };

    const result = main.map(row => ({ id: uuidv4(), data: row }));

    inclusion.forEach(item => {
        if (!result.some(row => arraysAreEqual(row.data, item))) {
            result.push({ id: uuidv4(), data: item });
        }
    });

    exclusion.forEach(item => {
        const index = result.findIndex(row => arraysAreEqual(row.data, item));
        if (index !== -1) result.splice(index, 1);
    });

    return result;
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
            const { key, id, updatedRow } = action.payload;
            if (state[key] && state[key].data) {
                state[key].data = state[key].data.map(row => row.id === id ? { ...row, data: updatedRow } : row);
            }
        },
        deleteRow: (state, action) => {
            const { key, id } = action.payload;
            if (state[key] && state[key].data) {
                state[key].data = state[key].data.filter(row => row.id !== id);
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
