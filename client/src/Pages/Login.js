import React from 'react'
import { useEffect } from 'react';
import {Form,Button} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import {useDispatch,useSelector} from 'react-redux'
import { loginUser } from '../slices/userSlice';
import {useNavigate} from 'react-router-dom'
import '../App.css'
function Login() {
    const nav=useNavigate()
    const dispatch = useDispatch()
    const {errors:userErrors,isAuth}=useSelector((state)=>state.user)
    useEffect(()=>{
        (isAuth)? nav('/Products'):nav('/Login')
    },[isAuth])
    const { register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    const submitFnct = (data) => { 
        dispatch(loginUser(data))
    }
return (
    <div className='bgl'>
        <div className='log'>
            <div className='login'>
            <h1>Login</h1>
        <Form onSubmit={handleSubmit(submitFnct)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control {...register("email",{ required: true,pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})} type="email" placeholder="Enter email" />
        {errors.email && <p>Invalid email</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control {...register("password")} type="password" placeholder="Password" />
        </Form.Group>
        {userErrors && <p>{userErrors}</p>}
        <Button variant="primary" type="submit">
        Login
        </Button>
        </Form>
        </div>
        </div>
        </div>
)}

export default Login