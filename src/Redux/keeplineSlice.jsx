import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
  lines: localStorage.getItem("lines")
    ? JSON.parse(localStorage.getItem("lines"))
    : [],
};

export const keeplineSlice = createSlice({
  name: 'keepline',
  initialState,
  reducers: {
    addToline: (state, action) => {
      const line = action.payload;
      state.lines.push(line);
      localStorage.setItem("lines", JSON.stringify(state.lines));
      toast.success("Line created successfully!");
    },

    updateToline: (state, action) => {
      const line = action.payload;
      const index = state.lines.findIndex((item) => item._id === line._id);
      if (index >= 0) {
        state.lines[index] = line;
        localStorage.setItem("lines", JSON.stringify(state.lines));
        toast.success("Line updated successfully!");
      }
    },

    removeFromLines: (state, action) => {
      const lineId = action.payload;
      const index = state.lines.findIndex((item) => item._id === lineId);
      if (index >= 0) {
        state.lines.splice(index, 1);
        localStorage.setItem("lines", JSON.stringify(state.lines));
        toast.success("Line deleted successfully!");
      }
    },

    resetAllLines: (state) => {
      state.lines = [];
      localStorage.setItem("lines", JSON.stringify(state.lines));
      toast.info("All lines cleared!");
    },
  },
});

export const { addToline, updateToline, removeFromLines, resetAllLines } = keeplineSlice.actions;

export default keeplineSlice.reducer;
