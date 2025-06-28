import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export default function EventForm({ initial, onSubmit }){
  return (
    <Formik
      initialValues={initial}
      validationSchema={Yup.object({
        title: Yup.string().required(),
        date: Yup.date().required(),
        description: Yup.string()
      })}
      onSubmit={onSubmit}>
      {({ errors, touched })=>(
        <Form>
          <Field name="title" placeholder="Title"/>
          {errors.title && touched.title && <div>{errors.title}</div>}
          <Field name="date" type="date"/>
          {errors.date && touched.date && <div>{errors.date}</div>}
          <Field as="textarea" name="description" placeholder="Description"/>
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  )
}
