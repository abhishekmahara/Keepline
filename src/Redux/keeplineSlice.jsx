import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lines:localStorage.getItem("lines")
  ? JSON.parse(localStorage.getItem("lines")):[]
}

export const keeplineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
   addToline : (state) => {
      
     
    },
    updateToline : (state) => {
   
    },
    resetAllLines : (state, action) => {
   
    },

    removeFromLines : (state, action)=>{

    },
  },
})

export const { addToline, updateToline, removeFromLines, resetAllLines } = keeplineSlice.actions

export default keeplineSlice.reducer
