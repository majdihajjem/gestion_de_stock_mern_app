import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProduct } from "../slices/productSlice";

function EditProductModal({ product, show = false, handleClose }) {
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState({});
  const { register, handleSubmit } = useForm({ defaultValues: product });
  const submitFnct = (data) => {
    dispatch(editProduct({ product: data, id: product._id, file: fileUpload }));
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(submitFnct)} style={{ padding: 16 }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>title</Form.Label>
            <Form.Control
              {...register("title")}
              type="text"
              placeholder="title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>desc</Form.Label>
            <Form.Control
              {...register("desc")}
              type="text"
              placeholder="description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>image</Form.Label>
            <Form.Control
              onChange={(e) => setFileUpload(e.target.files[0])}
              type="file"
              accept=".png,.jpg,.jpeg"
              placeholder="image"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantite</Form.Label>
            <Form.Control
              {...register("Qte")}
              type="Number"
              placeholder="quantite"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
      </Modal>
    </>
  );
}
export default EditProductModal;
