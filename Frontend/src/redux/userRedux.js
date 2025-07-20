import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name: "user",

    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {

            state.isFetching = false;
            state.error = true
        },

        logOut: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
        },

        // ADD THIS NEW REDUCER
        updateUserSuccess: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
    }
}
})

export const { loginFailure, loginStart, loginSuccess, logOut, updateUserSuccess } = userSlice.actions;
export default userSlice.reducer