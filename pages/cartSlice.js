import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart_items: [],
        // shipping_info: {}
    },
    reducers: {
        LOADCARTITEMS: (state, action)=>{
            return {...state, cart_items: action.payload}
        },
        ADDTOCART: (state, action) => {
            return {...state, cart_items: [...state.cart_items, action.payload]}
            // return {...state, cart_items: 
            //     state.cart_items.map(item=>{
            //         item.product == action.payload.product ? action.payload : item}
            //     )
            // }
        },
        UPDATECART: (state, action)=>{
            console.log(action.payload)
            return {...state, cart_items: state.cart_items.map(item=>{
                return item.product == action.payload.product ? action.payload : item
            })}
        },
        REMOVEFROMCART: (state, action) => {
            return {...state, cart_items: state.cart_items.filter(item=>item.product != action.payload)}
        },
        CLEARCART: (state) => {
            return state
        }
    }
})

// Action creators are generated for each case reducer function
export const { ADDTOCART, REMOVEFROMCART, CLEARCART, UPDATECART, LOADCARTITEMS } = cartSlice.actions

export default cartSlice.reducer