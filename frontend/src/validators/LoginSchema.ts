import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please provide valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters'),
});
