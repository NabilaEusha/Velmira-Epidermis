import { userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, updateUserSuccess } from "./userRedux"

export const login = async(dispatch, user) => {

    dispatch(loginStart());

    try { 
        const res = await userRequest.post("/auth/login/", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure())
    }
}


// ADD THESE NEW FUNCTIONS:

// Update user profile
export const updateUserProfile = async(dispatch, userData) => {
    try {
        const res = await userRequest.put("/users/update-profile", userData);
        dispatch(updateUserSuccess(res.data.user));
        return { success: true, message: res.data.message };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || "Failed to update profile" 
        };
    }
}

// Change password
export const changePassword = async(passwordData) => {
    try {
        const res = await userRequest.put("/users/change-password", passwordData);
        return { success: true, message: res.data.message };
    } catch (error) {
        console.error("Error changing password:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || "Failed to change password" 
        };
    }
}