import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '5d9UDWjdv4UtcL7z_CIjz',
    date: '2019-08-20T07:50:33.329Z',
    title: 'First Post!',
    content: 'Hello World!',
    user: '1',
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: 'YkHwHh13693yXaB0L6SnP',
    date: '2020-08-20T09:50:51.297Z',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
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
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
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
    reactionAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload
        const currentPost = state.find((post) => post.id === postId)
        if (currentPost) {
          currentPost.reactions[reaction]++
        }
      },
      prepare: (postId, reaction) => ({ payload: { postId, reaction } }),
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
