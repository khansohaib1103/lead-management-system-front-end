"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "./LeadForm.css"

const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'aol.com',
  'proton.me',
  'zoho.com',
  'gmx.net',
  'icloud.com'
];

const LeadSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Name is too short")
    .max(50, "Name is too long"),
  email: Yup.string()
    .required("Email is required")
    .test("valid-email-domain", "Please use a valid email provider (gmail.com, outlook.com, yahoo.com, etc.)", value => {
      if (!value) return false;
      const domain = value.split('@')[1];
      return ALLOWED_EMAIL_DOMAINS.includes(domain?.toLowerCase());
    }),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s]*$/, "Phone number can only contain digits, +, -, and spaces"),
  companyName: Yup.string()
    .required("Company name is required")
    .max(100, "Company name is too long"),
  notes: Yup.string()
    .max(500, "Notes cannot exceed 500 characters")
    .nullable(),
})

function LeadForm({ onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      console.log('Submitting form values:', values)
      await onSubmit(values)
      console.log('Form submission successful')
      resetForm()
    } catch (error) {
      console.error("Form submission error:", error)
      setApiError(error.message || "Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        notes: "",
      }}
      validationSchema={LeadSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting: formikSubmitting }) => (
        <Form className="lead-form">
          {apiError && (
            <div className="api-error-message">
              {apiError}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <Field
              id="fullName"
              name="fullName"
              type="text"
              className={errors.fullName && touched.fullName ? "error-input" : ""}
            />
            <ErrorMessage name="fullName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <Field
              id="email"
              name="email"
              type="email"
              className={errors.email && touched.email ? "error-input" : ""}
            />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              className={errors.phoneNumber && touched.phoneNumber ? "error-input" : ""}
            />
            <ErrorMessage name="phoneNumber" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <Field
              id="companyName"
              name="companyName"
              type="text"
              className={errors.companyName && touched.companyName ? "error-input" : ""}
            />
            <ErrorMessage name="companyName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <Field
              as="textarea"
              id="notes"
              name="notes"
              rows="4"
              className={errors.notes && touched.notes ? "error-input" : ""}
            />
            <ErrorMessage name="notes" component="div" className="error-message" />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting || formikSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Lead"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LeadForm
