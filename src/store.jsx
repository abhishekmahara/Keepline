import { configureStore } from '@reduxjs/toolkit'
import linesReducer from './Redux/keeplineSlice'

export const store = configureStore({
  reducer: {
   line : linesReducer,
  },
})