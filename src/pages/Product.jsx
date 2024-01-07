import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const API_URL = 'https://api.escuelajs.co/api/v1/products'

const Product = () => {
    const [product, setProduct] = useState([])
   
    const fetchProduct = async () => {
        try {
        const response = await fetch(`${API_URL}`)
        //console.log(response)
        if (response.ok) {
            const productData = await response.json()
            //access the data
            setProduct(productData)
        }
        } catch (error) {
            console.log(error)
        }       
    }

    useEffect(() => { 
        fetchProduct()
    },[]) 

    return (
    <> 
 
        <h1 className="main-title">Our Products</h1>
        <ul className="grid">   
            {product.map(products => (
                <div key={products.id}> 
                <Link to={`/products/${products.id}`}>
                    <img className="img" src={products.images[0]} alt={products.title}/> 
                        <div className="product-info">      
                            <h1>{products.title}</h1>
                            <p>{products.price} <span>&#8364;</span> </p>         
                        </div>  
                </Link>    
                                                    
                </div>                   
            ))}
        </ul>
  
    </>   
    )    
}
 
export default Product;