import {useState, useEffect} from 'react';

const useForm = (initialState = {}, callback, validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors, isSubmitting, callback]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));

        if (Object.keys(errors).length) {
            setIsSubmitting(false);
            setErrors(validate({...values, [event.target.name]: event.target.value}));
        }
    };

    const resetForm = () => {
        setValues(initialState);
        setIsSubmitting(false);
    }

    return {
        handleChange,
        handleSubmit,
        resetForm,
        values,
        errors,
    }
}

export default useForm;
