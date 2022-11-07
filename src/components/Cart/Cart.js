import {Fragment, useContext, useState} from "react";

import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from './Cart.module.css';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData, callback) => {
        fetch(
            'https://food-order-react-39803-default-rtdb.europe-west1.firebasedatabase.app/Orders.json',
            {
                method: 'POST', body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            }
        ).then(() => {
            setDidSubmit(true);
            cartCtx.reset();
            callback();
        }).catch(() => setDidSubmit(false));
    }

    const cartItems = <ul className={classes['cart-items']}>{
        cartCtx.items.map(item =>
            <CartItem key={item.id}
                      name={item.name}
                      amount={item.amount}
                      price={item.price}
                      onRemove={cartItemRemoveHandler.bind(null, item.id)}
                      onAdd={cartItemAddHandler.bind(null, item)}/>
        )}</ul>

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = !!cartCtx.items.length;

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['buttons--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler}/>}
            {!isCheckout && modalActions}
        </Fragment>
    );

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent an order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onBackdropClick={props.onClose}>
            {!didSubmit && cartModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;
