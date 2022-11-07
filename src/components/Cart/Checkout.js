import useForm from "../../hooks/use-form";
import validate from "../../utils/form-validations";

import classes from './Checkout.module.css';

const Checkout = (props) => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm
    } = useForm({name: '', city: '', street: '', postalCode: ''}, confirmHandler, validate);

    function confirmHandler() {
        props.onSubmit(values, () => resetForm());
    }

    const controlClasses = (valid) => `${classes.control} ${valid ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={controlClasses(!errors.name)}>
                <label htmlFor="name">Your name</label>
                <input type="text" id='name' name='name' onChange={handleChange} value={values.name}/>
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div className={controlClasses(!errors.street)}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' name='street' onChange={handleChange} value={values.street}/>
                {errors.street && <p>{errors.street}</p>}
            </div>
            <div className={controlClasses(!errors.postalCode)}>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id='postalCode' name='postalCode' onChange={handleChange} value={values.postalCode}/>
                {errors.postalCode && <p>{errors.postalCode}</p>}
            </div>
            <div className={controlClasses(!errors.city)}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' name='city' onChange={handleChange} value={values.city}/>
                {errors.city && <p>{errors.city}</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;
