import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Grid } from '@mantine/core';


const API_URL = 'https://api.escuelajs.co/api/v1/products'
const API_URL_CATEGORY = 'https://api.escuelajs.co/api/v1/categories'

const Product = () => {
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState([]);

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

    const fetchCategory = async () => {
        try {
        const response = await fetch(`${API_URL_CATEGORY}`)
        //console.log(response)
        if (response.ok) {
            const filterData = await response.json()
            //access the data
            setCategories(filterData)
            console.log(filterData)
        }
        } catch (error) {
            console.log(error)
        }       
    }

    useEffect(() => { 
        fetchProduct()
        fetchCategory()
    },[]) 

    const filterItems = (catItem) => {
        const updatedItems = product.filter((curItem) => curItem.category.name === catItem);
        setFilter(updatedItems);
    };
 
    return (
    <> 
     
        <h3>Discover Our Products</h3>
        <div className="filter-ctn"> 
            <ul>
                {categories.map((cat) => (
                <div className="filter-button" key={cat.id}>
                    <Button variant="outline" onClick={() => filterItems(cat.name)}>{cat.name}</Button>
                </div>
                ))}
        </ul>
    </div> 
   
        <ul className="grid">
            
        {(filter.length > 0 ? filter : product).map((products) => (
          <div key={products.id}>
            <Link to={`/products/${products.id}`}>
              <img className="img" src={products.images[0]} alt={products.title} />
              <div className="">
                <h1>{products.title}</h1>
                <p>
                  {products.price} <span>&#8364;</span>{" "}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </ul>

  
    </>   
    )    
}
 
export default Product;