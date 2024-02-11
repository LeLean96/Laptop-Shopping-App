import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const cartSlice= createSlice(
    {
        name: "cart",
        initialState: {
            itemsList: [],
            totalQuantity: 0,
            showCart: false
        },
        reducers:
        {
            addToCart(state, action){
                const newItem = action.payload; // get payload when click addToCart action
                // is item already in the cart --> increase item quantity only
                const existingItem = state.itemsList.find((item) => item.id === newItem.id);
                if(existingItem)
                {
                    existingItem.quantity++;
                    existingItem.totalPrice+= newItem.price;
                }
                else // just add the new product
                {
                    state.itemsList.push(
                        {
                            id: newItem.id,
                            price: newItem.price,
                            quantity: 1,
                            totalPrice: newItem.price,
                            name: newItem.name
                        }
                    );
                    state.totalQuantity++;
                }
            },
            removeFromCart(state, action)
            {
                const id = action.payload;
                const existingItem = state.itemsList.find(item => item.id === id);
                if(existingItem.quantity === 1)
                {
                    state.itemsList = state.itemsList.filter(item => item.id !== id);
                    state.totalQuantity--;
                }
                else{
                    existingItem.quantity--;
                    existingItem.totalPrice-= existingItem.price;
                }
            },
            setShowCart(state, action){
                state.showCart = !state.showCart;
            }
        }
    }

);

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification(
        {
            open: true,
            message: "Sending Request",
            type: "warning"
        })
        );
        const sendRequest = async () => {
            // send state as a send request
            const res = await fetch("https://redux-http-c7955-default-rtdb.firebaseio.com/cartItems.json",
            {
              method: "PUT",
              body: JSON.stringify(cart)
            });
            const data = await res.json();
            // send state as request is successful
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Send Request to Database Successfuly',
              type: "success"
            }))
          };
          try {
            await sendRequest();
          } catch (err) {
            // send state as error
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request Failed',
                type: "error"
            }))
          }
    }
}
export const cartActions = cartSlice.actions;
export default cartSlice;