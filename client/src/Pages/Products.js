import {useEffect} from 'react'
import {getProducts} from '../slices/productSlice'
import {useDispatch,useSelector} from 'react-redux'
import ProductCard from '../components/ProductCard'
import AddModal from '../components/AddModal'
function Products() {
  const dispatch=useDispatch()
  // const {productList}= useSelector(state=>state.Products)
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  return (
    <div>
      <AddModal/>
      {/* {{productList.map(product=> {<ProductCard product={product}/>})} }   */}
    </div>
  )
}

export default Products