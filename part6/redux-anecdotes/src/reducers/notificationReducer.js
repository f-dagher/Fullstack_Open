import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notication',
  initialState: initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    }
  },
})

export const {displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async dispatch => {
    delay = delay * 1000
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, delay)
  }
}
export default notificationSlice.reducer