
import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format.')
    .min(5, 'Email must be at least 5 characters.')
    .max(255, 'Email cannot exceed 255 characters.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(50, 'Password cannot exceed 50 characters.')
    .required('Password is required.'),
});

export default loginValidationSchema;