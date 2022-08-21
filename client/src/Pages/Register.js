import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import { registerUser } from '../slices/userSlice';
function Register() {
    const dispatch = useDispatch()
    const { register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    const submitFnct = (data) => { 
        dispatch(registerUser(data))
     }
  return (
        <Form onSubmit={handleSubmit(submitFnct)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control {...register("username")} type="text" placeholder="Enter UserName" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email",{ required: true,pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        {errors.email && <p>Invalid email</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>

)
}

export default Register