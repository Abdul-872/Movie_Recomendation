import { configureStore } from '@reduxjs/toolkit'
import movieReducers from './reducers/MovieSlice'
import tvReducers from './reducers/TvSlice'
import peopleReducers from'./reducers/PeopleSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducers,
    tv:tvReducers,
    People:peopleReducers
  },
})