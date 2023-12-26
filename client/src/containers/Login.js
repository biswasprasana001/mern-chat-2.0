import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = ({ onLoginSuccess }) => {
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('/api/user/login', values);
      // Handle response data
      console.log(response.data);
      onLoginSuccess(response.data); // Pass the token and user info up
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false, message: error.response?.data?.message || 'Login failed' });
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            {status && status.success && <p>Login successful!</p>}
            {status && !status.success && <p>{status.message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;