import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

export default function LoginForm({ initial, onSubmit }) {
  const [submitError, setSubmitError] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={initial}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setLoading(true)
        setSubmitError(null)
        try {
          const result = await onSubmit(values)
          if (!result) setSubmitError('Invalid username or password')
        } catch (err) {
          console.error(err)
          setSubmitError('Something went wrong. Please try again.')
        } finally {
          setLoading(false)
          setSubmitting(false)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
          <div>
            <Field name="username" placeholder="Username" />
            {errors.username && touched.username && (
              <div className="error">{errors.username}</div>
            )}
          </div>

          <div>
            <Field
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <div className="error">{errors.password}</div>
            )}
          </div>

          {submitError && <div className="error">{submitError}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
