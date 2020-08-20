import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '5d9UDWjdv4UtcL7z_CIjz',
    date: '2019-08-20T07:50:33.329Z',
    title: 'First Post!',
    content: 'Hello World!',
    user: '1',
  },
  {
    id: 'YkHwHh13693yXaB0L6SnP',
    date: '2020-08-20T09:50:51.297Z',
    title: 'Second Post',
    content: 'More text',
    user: '2',
  },
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
