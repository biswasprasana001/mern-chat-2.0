import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema
const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Required'),
});

const Registration = () => {
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('/api/user/register', values);
      // Handle response data
      console.log(response.data);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field type="text" name="username" placeholder="Username" />
            <Field type="password" name="password" placeholder="Password" />
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
            {status && status.success && <p>Registration successful!</p>}
            {status && !status.success && <p>Registration failed. Try again.</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;