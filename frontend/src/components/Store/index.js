import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import studentsSlice from "./studentsSlice";

const Store = configureStore({
  reducer:{
    auth: authSlice,
    users: usersSlice,
    student: studentsSlice,
  }
})
export default Store