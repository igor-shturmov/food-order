const isEmpty = (value) => value.trim().length === '';
const isFiveChars = (value) => value.trim().length === 5;

export default function validate(values) {
    let errors = {};

    if (!values.name || isEmpty(values.name)) {
        errors.name = 'Please enter a valid name!';
    }

    if (!values.street || isEmpty(values.street)) {
        errors.street = 'Please enter a valid street!';
    }

    if (!values.postalCode || !isFiveChars(values.postalCode)) {
        errors.postalCode = 'Please enter a valid postal code!';
    }

    if (!values.city || isEmpty(values.city)) {
        errors.city = 'Please enter a valid city!';
    }

    return errors;
};
