import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.data.push(action.payload)
      },
      prepare: (userId, title, content) => ({
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
        },
      }),
    },
    postUpdated: {
      reducer: (state, action) => {
        const { id, title, content } = action.payload
        const currentPost = state.data.find((post) => post.id === id)
        if (currentPost) {
          currentPost.title = title
          currentPost.content = content
        }
      },
      prepare: (id, title, content) => ({ payload: { id, title, content } }),
    },
    reactionAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload
        const currentPost = state.data.find((post) => post.id === postId)
        if (currentPost) {
          currentPost.reactions[reaction]++
        }
      },
      prepare: (postId, reaction) => ({ payload: { postId, reaction } }),
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = state.data.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
