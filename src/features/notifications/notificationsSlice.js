import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = notificationsAdapter.getInitialState()

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotification',
  async (arg, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead: (state) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    },
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors((state) => state.notifications)

export default notificationsSlice.reducer
