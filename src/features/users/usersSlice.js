import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, name: 'Ahmed Safe' },
  { id: 2, name: 'John Whatever' },
  { id: 3, name: 'Jack Say What' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
