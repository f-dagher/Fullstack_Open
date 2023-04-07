import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notication',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    }
  },
})

export const {setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer