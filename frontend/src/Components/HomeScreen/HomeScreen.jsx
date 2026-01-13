import React, { useEffect} from 'react'
import ProductScreen from '../ProductDetails/ProductScreen'
import LoadingBox from '../Loading/LoadingBox'
import MessageBox from '../Loading/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../Stores/ProductListSlice'

const HomeScreen = () => {
  const {products,loading,error} = useSelector(state=> state.productList);
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="row center">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        products.map(product => (
          <ProductScreen key={product._id} product={product} />
        ))
      )}
    </div>
  )
}

export default HomeScreen
