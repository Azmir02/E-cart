import { createContext, useReducer } from "react";


const Store = createContext()


const initialstate = {
    cart:{
        cartItems: localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem("cartitems")) : []
    }
}


function reducer(state, action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        const NewItem = action.payload
        const exixstingItem = state.cart.cartItems.find((item)=> item._id == NewItem._id)
        const cartItems = exixstingItem ? state.cart.cartItems.map((item) => item._id === exixstingItem._id ? NewItem: item): [...state.cart.cartItems,NewItem]

        localStorage.setItem("cartitems", JSON.stringify(cartItems))

            return {
                ...state,
                cart:{
                    ...state.cart,
                    cartItems: cartItems
                }
            }

    case 'DELETE_CART':{
        const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)
        localStorage.setItem("cartitems", JSON.stringify(cartItems))

        return{
            ...state,
            cart:{
                ...state.cart,
                cartItems: cartItems
            }
        }
    }
      default:
        return state
    }
  }
  
  //=================This is Wishlist part A2Z copy to add to cart part ==================================

  const initialstate2 = {
    Wishlist:{
        WishlistItems: localStorage.getItem("Wishlistitems") ? JSON.parse(localStorage.getItem("Wishlistitems")) : []
    }
}


function reducer2(state, action) {
    switch (action.type) {
      case 'WISHLIST_TO_CART':
        const NewItem = action.payload
        const exixstingItem = state.Wishlist.WishlistItems.find((item)=> item._id == NewItem._id)
        const WishlistItems = exixstingItem ? state.Wishlist.WishlistItems.map((item) => item._id === exixstingItem._id ? NewItem: item): [...state.Wishlist.WishlistItems,NewItem]

        localStorage.setItem("Wishlistitems", JSON.stringify(WishlistItems))

            return {
                ...state,
                Wishlist:{
                    ...state.Wishlist,
                    WishlistItems: WishlistItems
                }
            }
        case 'DELETE_WISHLIST_CART':{
                const WishlistItems = state.Wishlist.WishlistItems.filter((item)=> item._id !== action.payload._id)
                localStorage.setItem("Wishlistitems", JSON.stringify(WishlistItems))
        
                return {
                    ...state,
                    Wishlist:{
                        ...state.Wishlist,
                        WishlistItems: WishlistItems
                    }
                }
            }
      default:
        return state
    }
  }



const Storeprovider = (props)=>{
    const [state,dispatch] = useReducer(reducer,initialstate)
    const [state2,dispatch2] = useReducer(reducer2,initialstate2)

    const value = {state,dispatch,state2,dispatch2} 

    return <Store.Provider value = {value}>{props.children}</Store.Provider>

}


export {Storeprovider,Store}