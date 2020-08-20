import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello World!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (userId, title, content) => ({
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
        },
      }),
    },
    postUpdated: {
      reducer: (state, action) => {
        const { id, title, content } = action.payload
        const currentPost = state.find((post) => post.id === id)
        if (currentPost) {
          currentPost.title = title
          currentPost.content = content
        }
      },
      prepare: (id, title, content) => ({ payload: { id, title, content } }),
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
