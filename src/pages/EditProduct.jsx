import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";
import { TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { Button } from "@mantine/core";


const API_URL = 'https://api.escuelajs.co/api/v1/products'

const EditProduct = () => {
    const { productId } = useParams()
    //console.log('Current productId:', productId);
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

    const fetchProduct = async() => {
        try {
            const response = await fetch(`${API_URL}/${productId}`);
                if(response.ok) {
                    const productData = await response.json()
                    //console.log(productData)
                    setTitle(productData.title)
                    setDescription(productData.description)
                    setPrice(productData.price)                 
                }
            } catch (error) {
              console.log(error)
            }
    }

    useEffect(() => {
        fetchProduct()
        //console.log('Inside useEffect, productId:', productId);
    },[])

    const handleSubmit = async event => {
        //prevent the refresh of the page
        event.preventDefault()
        //
        const payload = {
            title,
            description,
            price, 
          };           

        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                
            })
            //console.log(JSON.stringify(payload));       
            if (response.ok) {
                const updatedProduct = await response.json(); // Store the JSON data
                console.log(updatedProduct);
          
                // Redirect to the product detail page
                navigate(`/products/${productId}`);
              } else {
                //console.log(`Error: ${response.status}`);
              }
            } catch (error) {
              console.log(error);
            }
    }

    return ( 
    <>
    <div className="edit-form">
     <h2>{title}</h2>
     <form onSubmit={handleSubmit}>
        <label>
          Title:
          <Input value={title} onChange={event => setTitle(event.target.value)} required />
        </label>
        <label>
          Description:
          <Input className="size" value={description} onChange={event => setDescription(event.target.value)} required />
        </label>
        <label>
          Price:
          <Input value={price} onChange={event => setPrice(event.target.value)} required/>
        </label>
        
      </form>
      <Button type='submit'>Update</Button>
    </div>  
    </> 
    )
}
 
export default EditProduct;