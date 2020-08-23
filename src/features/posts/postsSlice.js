import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk('posts/addPost', async (post) => {
  const response = await client.post('/fakeApi/posts', { post })
  return response.post
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: {
      reducer: (state, action) => {
        const { postId, title, content } = action.payload
        const currentPost = state.entities[postId]
        if (currentPost) {
          currentPost.title = title
          currentPost.content = content
        }
      },
      prepare: (postId, title, content) => ({
        payload: { postId, title, content },
      }),
    },
    reactionAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload
        const currentPost = state.entities[postId]
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
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
