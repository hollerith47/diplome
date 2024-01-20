import {createSlice} from "@reduxjs/toolkit";
import createAxiosInstance from "../../utils/axios";



const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null

}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: (state, action) => {
      state.isLoggedIn = false
      state.token = ""
    },
  },
})

export default slice.reducer;


export function  LoginUser(data) {
  const axiosInstance = createAxiosInstance();
  // const {email, password} = data;
  return async (dispatch, getState) => {
    await axiosInstance.post("/login",{
      ...data,
    }).then((response) => {
      console.log(response.data.data)
      dispatch(slice.actions.logIn({
        isLoggedIn: true,
        token: response.data.data.token,
        user: response.data.data.user,
      }))
    })
      .catch((error) => console.log(error))
  }
}

export function LogOutUser(token) {
  const axiosInstance = createAxiosInstance(token);
  return async (dispatch, getState) => {
    await axiosInstance.get("/logout")
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.logOut());
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
