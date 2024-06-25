import Swal from "sweetalert2"
import { ADDTOCART, REMOVEFROMCART, SAVESHIPPINGINFO, UPDATECART } from "../cartSlice"

export const add_to_cart = (item, quantity) => async (dispatch, getState) => {
    // let cart_items = await JSON.parse(localStorage.getItem('cart_items'))
    let cart_items = getState().cart.cart_items

    console.log(cart_items, item)
    let new_cart_item = item
    let itemExists = await cart_items?.find(cart_item => cart_item.product === item._id)

    if (!itemExists) {
        new_cart_item = {
            product: item._id,
            title: item.title,
            price: item.price,
            stock: item.count_in_stock,
            image: item.image,
            quantity
        }
        await dispatch(ADDTOCART(new_cart_item))
        Swal.fire("New item added")
    }
    else {
        new_cart_item = {
            product: item._id,
            title: item.title,
            price: item.price,
            stock: item.count_in_stock,
            image: item.image,
            quantity: itemExists.quantity + quantity
        }

        await dispatch(UPDATECART(new_cart_item))
        Swal.fire("Item updated")
    }

    // console.log(getState().cart.cart_items)
    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))

}

export const update_cart = (id, quantity) => async (dispatch, getState) => {
    let cart_items = getState().cart.cart_items

    let itemExists = await cart_items?.find(cart_item => cart_item.product === id)
    // itemExists.quantity = quantity

    let new_item = {
        ...itemExists, quantity
    }

    await dispatch(UPDATECART(new_item))
    Swal.fire("Quantity updated")

    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))

}

export const remove_from_cart = (id) => async (dispatch, getState) => {
    await dispatch(REMOVEFROMCART(id))
    Swal.fire("Item removed from cart")

    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))
    

}

export const saveShippingInfo = (shipping_info) => async (dispatch, getState) => {
    console.log(shipping_info)
    await dispatch(SAVESHIPPINGINFO(shipping_info))

    localStorage.setItem('shipping_info', JSON.stringify(await getState().cart.shipping_info))

}