import { useEffect } from "react";
import { getProducts } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import ProductCard from "../components/ProductCard";
import AddModal from "../components/AddModal";

function Products() {
  const dispatch = useDispatch();
  const { productList, loading } = useSelector(({ products }) => products);

  // const {productList}= useSelector(state=>state.Products)
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 24 }}>
        <AddModal />
      </div>
      <br />
      <div className="product-container">
        {loading && <Spinner animation="border" />}
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {!loading && productList?.length === 0 && "Ouups... No product to show"}
      </div>
    </div>
  );
}

export default Products;
