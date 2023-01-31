import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        newNotification: (state, action) => {
            return action.payload
        },
        clearNotification: (state, action) => {
            return null
        }
    }
  })

export const setNotification = (notification, timeout = 5) => {
  return async dispatch => {
    dispatch(newNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export const { newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer