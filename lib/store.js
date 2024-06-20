import { configureStore } from '@reduxjs/toolkit'
import  cartReducer  from '../pages/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    }
  })
}