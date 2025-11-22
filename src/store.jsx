import { configureStore } from '@reduxjs/toolkit'
import keeplineReducer from './Redux/keeplineSlice'

export const store = configureStore({
  reducer: {
     
    keepline: keeplineReducer,
  },
})

export default store
