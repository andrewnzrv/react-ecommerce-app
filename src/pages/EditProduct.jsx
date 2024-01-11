import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";
import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Textarea } from '@mantine/core';


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
    },[])

    const handleSubmit = async event => {

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
    
            if (response.ok) {
                const updatedProduct = await response.json(); 
                console.log(updatedProduct);

                navigate(`/products/${productId}`);
              } else {

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
          <Textarea className="size" value={description} onChange={event => setDescription(event.target.value)} required />
        </label>
        <label>
          Price:
          <Input value={price} onChange={event => setPrice(event.target.value)} required/>
        </label>
        <Button className="edit-button" type='submit'>Update</Button> 
      </form>
      
    </div>  
    </> 
    )
}
 
export default EditProduct;