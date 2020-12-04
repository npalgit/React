import { useState, useEffect } from 'react';

function parseValue(type, value, checked) {
	if (type === 'checkbox') return checked;
	if (type === 'number' || type === 'range') {
		const parsed = parseFloat(value);
		if (isNaN(parsed)) return undefined;
		return parsed;
	}
	return value;
}
const useForm = (props) => {
	const { initialValues, onSubmit, validate, applyRules } = props;
	const [values, setValues] = useState(null);
	const [errors, setErrors] = useState({});
	const [touchedField, setTouchedField] = useState('');
	const [valid, setValid] = useState(false);
	const [touched, setTouched] = useState(false);

	useEffect(() => {
		if (validate && typeof validate === 'function' && touched) {
			const _errors = validate(values);
			setValid(formIsValid(_errors));
			if (_errors.hasOwnProperty(touchedField)) {
				setErrors({ [touchedField]: _errors[touchedField] });
			} else {
				setErrors({});
			}
		}
	}, [values]);

	
	useEffect(() => {
		if (initialValues)
			setValues((values) => ({
				...values,
				...initialValues
			}));
	}, [initialValues]);

	function handleSubmit() {
		const erros = validate && validate(values);
		erros && setErrors({ ...erros });
		if (erros && !formIsValid(erros)) return;
		onSubmit(values, errors);
	}
	function handleChange({ target: { name, type, value, checked } }) {
		setTouchedField(name);
		const otherProps = applyRules && applyRules(name, value);
		setValues((values) => ({
			...values,
			...otherProps,
			[name]: parseValue(type, value, checked)
		}));
		setTouched(true);
	}

	function handleChangeKV(name, value) {
		setTouchedField(name);
		const otherProps = applyRules && applyRules(name, value);
		setValues({
			...values,
			...otherProps,
			[name]: value
		});
		setTouched(true);
    }

    function resetValues(props) {
		setValues({
			...values,
			...props
		});
		setTouched(false);
	}

	function handleBlur(event) {
		const { target } = event;
		const { name, value } = target;
		setTouched(true);
	}

	const formIsValid = (e) => Object.keys(e).length === 0;

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
		valid,
		touched,
		handleBlur,
		handleChangeKV,
		setErrors,
        setValues,
        resetValues
	};
};

export default useForm;