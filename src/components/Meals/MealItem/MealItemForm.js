import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setFormIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={amountInputRef}
                input={{
                    id: `amount ${props.id}`,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}/>
            <button>+ Add</button>
            {!formIsValid && <p>Please enter the valid amount</p>}
        </form>
    )
}

export default MealItemForm;
