import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Yup validation schema with string().required()
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less'),
    
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    // Handle form submission logic here
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field 
                type="text" 
                id="username" 
                name="username" 
              />
              <ErrorMessage 
                name="username" 
                component="div" 
                style={{ color: 'red' }} 
              />
            </div>
            
            <div>
              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                style={{ color: 'red' }} 
              />
            </div>
            
            <div>
              <label htmlFor="password">Password:</label>
              <Field 
                type="password" 
                id="password" 
                name="password" 
              />
              <ErrorMessage 
                name="password" 
                component="div" 
                style={{ color: 'red' }} 
              />
            </div>
            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikForm;