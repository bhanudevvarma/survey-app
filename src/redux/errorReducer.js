import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errormessage: null,
}

const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers: {
        setError:(state,action) => {
            state.errormessage = action.payload;
            console.log('error calling set error', setError)
        },
        clearError:(state,action) => {
            console.log('error calling clear', clearError)
            state.errormessage=null;
        },
    }
})

export const {clearError, setError}= errorSlice.actions;
export default errorSlice.reducer;
