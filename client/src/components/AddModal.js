import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, 
    handleSubmit, 
    formState: { errors } 
} = useForm();
const submitFnct = (data) => { 
    // dispatch(registerUser(data))
}
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
 <Form onSubmit={handleSubmit(submitFnct)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>title</Form.Label>
        <Form.Control {...register("title")} type="text" placeholder="title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>desc</Form.Label>
        <Form.Control {...register("desc")} type="text" placeholder="description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>image</Form.Label>
        <Form.Control {...register("image")} type="file" accept='.png,.jpg,.jpeg' placeholder="image" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantite</Form.Label>
        <Form.Control {...register("Qte")} type="Number" placeholder="quantite" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
      </Modal>
    </>
  );
}
export default AddModal