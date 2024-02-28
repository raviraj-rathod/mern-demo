import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  students:[],
  singleStudent: {},
  loading: false,
}
const studentsSlice = createSlice({
  name:'users',
  initialState,
  reducers: (create) => ({
      allStudents: create.reducer((state, action) => {
        state.students = action.payload;
      }),
      getSingleStudent: create.reducer((state, action) => {
        state.singleStudent = action.payload;
      }),
  }),
})

export const { allStudents, getSingleStudent } = studentsSlice.actions;
export default studentsSlice.reducer;