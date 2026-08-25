import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null,
}

export const PeopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    loadPeople:(state,action)=>{
        state.info=action.payload
    },
    removePeople:(state)=>{
        state.info=null
    }
  },
})

export const { loadmovie,removemovie } = PeopleSlice.actions

export default PeopleSlice.reducer