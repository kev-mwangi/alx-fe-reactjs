import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be 20 characters or less')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

// Initial form values
const initialValues = {
  username: '',
  email: '',
  password: ''
};

const FormikForm = () => {
  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Registration Successful!\nUsername: ${values.username}\nEmail: ${values.email}`);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="formik-container">
      <div className="formik-card">
        <h2 className="formik-title">Register with Formik</h2>
        <p className="formik-subtitle">Using Formik for form state management</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values, errors, touched, handleChange, handleBlur }) => (
            <Form className="formik-form">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="username" component="div" className="error-text" />
                {!errors.username && touched.username && (
                  <div className="success-text">✓ Username is valid</div>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="email" component="div" className="error-text" />
                {!errors.email && touched.email && (
                  <div className="success-text">✓ Email is valid</div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="password" component="div" className="error-text" />
                
                {/* Password Requirements */}
                <div className="requirements">
                  <p className="requirements-title">Password Requirements:</p>
                  <ul>
                    <li className={values.password.length >= 6 ? 'met' : 'unmet'}>
                      ✓ At least 6 characters
                    </li>
                    <li className={/[a-z]/.test(values.password) ? 'met' : 'unmet'}>
                      ✓ Contains lowercase letter
                    </li>
                    <li className={/[A-Z]/.test(values.password) ? 'met' : 'unmet'}>
                      ✓ Contains uppercase letter
                    </li>
                    <li className={/\d/.test(values.password) ? 'met' : 'unmet'}>
                      ✓ Contains number
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form Status */}
              <div className="form-status">
                <div className="status-item">
                  <span className={`status-indicator ${dirty ? 'dirty' : 'pristine'}`}></span>
                  <span>Form is {dirty ? 'modified' : 'pristine'}</span>
                </div>
                <div className="status-item">
                  <span className={`status-indicator ${isValid ? 'valid' : 'invalid'}`}></span>
                  <span>Form is {isValid ? 'valid' : 'invalid'}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${!(isValid && dirty) || isSubmitting ? 'disabled' : ''}`}
                disabled={!(isValid && dirty) || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  'Register'
                )}
              </button>

              {/* Reset Button */}
              <button
                type="button"
                className="reset-btn"
                onClick={() => {
                  const form = document.querySelector('.formik-form');
                  if (form) form.reset();
                }}
              >
                Reset Form
              </button>
            </Form>
          )}
        </Formik>

        {/* Debug Info */}
        <div className="debug-section">
          <h4>Formik Form State Preview:</h4>
          <Formik
            initialValues={initialValues}
          >
            {({ values, errors, touched }) => (
              <div className="debug-info">
                <div className="debug-row">
                  <strong>Values:</strong>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
                <div className="debug-row">
                  <strong>Errors:</strong>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </div>
                <div className="debug-row">
                  <strong>Touched:</strong>
                  <pre>{JSON.stringify(touched, null, 2)}</pre>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormikForm;