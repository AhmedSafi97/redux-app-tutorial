import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { selectAllPosts } from '../posts/postsSlice'

const initialState = []

export const fetchUsers = createAsyncThunk('fetch/users', async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => action.payload,
  },
})

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default usersSlice.reducer
