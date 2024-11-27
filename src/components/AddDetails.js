import React from 'react'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddDetails() {
    let navigate = useNavigate()

    let handleSubmit = async (e) => {
        e.preventDefault()

        let data = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            department: e.target.department.value
        }

        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/users`, data)
            if (res.status === 201 || res.status === 200) {
                toast.success(res.data.message)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error || error.response.data.message)
        }
    }
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            department: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Required'),
            lastname: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            department: Yup.string().required("Required")
        })
    })

    return <div className='main-content'>
        <div className='form-content'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                        type="text"
                        id='name'
                        name='firstname'
                        placeholder="Firstname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstname}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                        <div className='error'>{formik.errors.firstname}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type="text"
                        id='lastname'
                        name='lastname'
                        placeholder="Lastname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                        <div className='error'>{formik.errors.lastname}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        id='email'
                        name='email'
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        id='department'
                        name='department'
                        placeholder="Enter department"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.department}
                    />
                    {formik.touched.department && formik.errors.department ? (
                        <div className='error'>{formik.errors.department}</div>
                    ) : null}
                </Form.Group>

                <Button variant="primary" type="submit"  >
                    Submit
                </Button>
            </Form>
        </div>
    </div>
}

export default AddDetails