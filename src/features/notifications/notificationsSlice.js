import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotification',
  async (arg, { getState }) => {
    const allNotifications = getState().notifications
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
  initialState: [],
  reducers: {
    allNotificationsRead: (state, action) => {
      state.forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.forEach((notification) => {
        notification.isNew = !notification.read
      })
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer
