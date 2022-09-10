import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { deleteProduct } from "../slices/productSlice";
import { useDispatch } from "react-redux";
import EditProductModal from "./EditProductModal";

function ProductCard({ product }) {
  const { image } = product;
  const dispatch = useDispatch();
  const [toDeleteProduct, setToDeleteProduct] = useState(false);
  const handleHideToDeleteProduct = () => setToDeleteProduct(false);
  const [toEditProduct, setToEditProduct] = useState(false);
  const handleHideToEditProduct = () => setToEditProduct(false);
  const handleShowToEditProduct = () => setToEditProduct(true);

  const imageSrc = `${process.env.REACT_APP_IMAGE_DIR}${image?.split("my-images\\")?.[1]}`

  return (
    <>
      <Card style={{ width: "18rem", margin: 18 }}>
        <Card.Img variant="top" src={imageSrc} style={{ height: 160 }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.desc}</Card.Text>
          <Card.Text>{product.Qte}</Card.Text>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={handleShowToEditProduct}>
              Edit
            </Button>
            &nbsp; &nbsp;
            <Button variant="danger" onClick={() => setToDeleteProduct(true)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={toDeleteProduct} onHide={handleHideToDeleteProduct}>
        <div style={{ margin: 16, padding: 16 }}>
          <p> Confirm deleting product : {product?.title} </p>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="secondary"
              style={{ maxWidth: 100 }}
              onClick={handleHideToDeleteProduct}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              style={{ maxWidth: 100 }}
              onClick={() => {
                dispatch(deleteProduct(product?._id));
                handleHideToDeleteProduct();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <EditProductModal
        show={toEditProduct}
        handleClose={handleHideToEditProduct}
        product={product}
      />
    </>
  );
}

export default ProductCard;
