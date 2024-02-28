import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users:[],
  singleUser: {},
  loading: false,
}
const usersSlice = createSlice({
  name:'users',
  initialState,
  reducers: (create) => ({
      getAllUsers: create.reducer((state, action) => {
        state.users = action.payload;
      }),
      getSingleUser: create.reducer((state, action) => {
        state.singleUser = action.payload;
      }),
  }),
})

export const { getAllUsers, getSingleUser } = usersSlice.actions;
export default usersSlice.reducer;