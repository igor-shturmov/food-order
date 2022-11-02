import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'addItem') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [...state.items, action.item];
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'removeItem') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== existingCartItem.id);
        } else {
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = {...existingCartItem, amount: existingCartItem.amount - 1};
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }


    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addCartItemHandler = (item) => dispatchCartAction({type: 'addItem', item});
    const removeCartItemHandler = (id) => dispatchCartAction({type: 'removeItem', id});

    const cartContextHelper = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler,
    };

    return (
        <CartContext.Provider value={cartContextHelper}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;
