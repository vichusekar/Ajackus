import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function EditDetails() {
  let navigate = useNavigate()
  let params = useParams()
  let [data, setData] = useState("")
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [email, setEmail] = useState('')
  let [department, setDepartment] = useState('')


  let handleSubmit = async (e) => {
    try {
      let res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${params.id}`, e)
      setData(res.data)
      toast.success(res.data.message)
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message || error.response.data.error)
    }
  }

  let formik = useFormik({
    initialValues: {
      firstname,
      lastname,
      email,
      department,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
      email: Yup.string().email('Enter a valid email').required('Required'),
      department: Yup.string().required('Required'),
    }),
    onSubmit: handleSubmit,
  })

  let getDataById = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${params.id}`)
      setFirstname(res.data.name || '')
      setLastname(res.data.username || '')
      setEmail(res.data.email || '')
      setDepartment(res.data.company.name || '')
      console.log(res)
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.error || error.response.data.message)
    }
  }

  useEffect(() => {
    if (params.id) {
      getDataById();
    }
  }, [params.id]);

  return (
    <div className="main-content">
      <div className='form-content'>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="error">{formik.errors.firstname}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="error">{formik.errors.lastname}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              id="department"
              name="department"
              placeholder="Enter department"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            />
            {formik.touched.department && formik.errors.department ? (
              <div className="error">{formik.errors.department}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditDetails
