import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "./Cart";

const API_URL = 'https://api.escuelajs.co/api/v1/products'

const ProductDetail = ({setCart}) => {
    const { productId } = useParams()
    const [product, setProduct] = useState()
    const navigate = useNavigate()

    
    const fetchProduct = async() => {
        try {
            const response = await fetch(`${API_URL}/${productId}`);
                if(response.ok) {
                    const productData = await response.json()
                    //console.log(productData)
                    setProduct(productData)
                }
            } catch (error) {
              console.log(error)
            }
    }

    useEffect(() => {
        fetchProduct()
    },[])

    const handleDelete = async () => {

        try {
            const response = await fetch(`${API_URL}/${productId}`,{
                method: 'DELETE',
            }); 
            console.log(response)    
            if (response.ok) {
                navigate('/product')
            }     
        } catch (error) {
            console.log(error);
        }

    }

    const handleCart = () => {
        // add product to the cart
        setCart((cart)=>{
            return [...cart, product]
        });

      };
    //console.log("this is the product", productId)
    return (                  
        <>
        <div className="grid-detail">
         <h1>id {productId}</h1>  
         {product ? 
         
            <>
                <p>{product.title}</p> 
                <p>{product.description}</p>
                <img className="img-detail" src={product.images[0]} alt={product.title}/> 
                <p>{product.price} <span>&#8364;</span> </p>
            
                <Link to={`/products/${productId}/update`}>
                    <button type='button'>Update</button>
                </Link>

                <button type="button" onClick={handleDelete}>Delete Product</button>
                <button onClick={handleCart} type="button">Add to Cart</button>                                     
            </>
                     
         : null} 
        </div> 
        </>        
    )   
}
 
export default ProductDetail;