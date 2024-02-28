import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../apis";

export const getLogin = createAsyncThunk("admin/login", async (data, { rejectWithValue, dispatch }) => {
  const backend = new API();
  await backend.fetch('admin/login', {
    method: "POST",
    body: JSON.stringify(data)
  }).then((res)=>{

    dispatch(login(res))
    return res
  }).catch((err)=>{
    rejectWithValue(err)
  })

});

const initialState = {
  status:false,
  userData: null,
  loading: false,
}
const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: (create) => ({
      login: create.reducer((state, action) => {
        state.status = true;
        localStorage.setItem('token', action.payload.token);
        if(action.payload && action.payload){
          localStorage.setItem('userInfo', JSON.stringify(action.payload));
          state.userData = action.payload;
        }
      }),
      logout: create.reducer((state) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        state.status = false;
        state.userData = null;
      }),
      checkLogin: create.reducer((state)=>{
        state.status=localStorage.getItem("token")? true:false;
        let userInfo = localStorage.getItem("userInfo");
        if(userInfo !== null){
          state.userData = JSON.parse(userInfo);
        }
      }),
  }),
  // extraReducers: {
  //   [getLogin.fulfilled]: () => {
  //     console.log('fulfilled');
  //   },
  //   [getLogin.pending]: () => {
  //     console.log('pending');
  //     // state.status = "Fetching todos. Please wait a moment...";
  //   },
  //   [getLogin.rejected]: () => {
  //     console.log('Failed');
  //     // state.status = "Failed to fetch data...";
  //   }
  // }
})

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;