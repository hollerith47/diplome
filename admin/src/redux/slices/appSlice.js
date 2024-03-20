import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isUserEditable : false,

}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        ToggleEditBtn: (state, action) => {
            state.isUserEditable =!state.isUserEditable;
        }
    }
})

export const { ToggleEditBtn } = slice.actions;
export default slice.reducer;