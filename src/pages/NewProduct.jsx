import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";
import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Textarea } from '@mantine/core';

const API_URL = "https://api.escuelajs.co/api/v1/products";

const NewProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (event) => {
    //prevent the refresh of the page
    event.preventDefault();
    //
    const payload = {
      title,
      description,
      price,
      categoryId: 1,
      images: ["https://picsum.photos/200","https://picsum.photos/200","https://picsum.photos/200"],
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(payload),
       
      });

      if (response.status === 201) {
        const newProductJson = await response.json(); 
        console.log(newProductJson);
        // Redirect to the product detail page
        navigate(`/products/${newProductJson.id}`);
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-form">
        <h2>Add a new product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <Input 
              placeholder="Add a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>
          <label className="margin">
            Description:
            <Textarea 
              placeholder="Add your description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <Input 
              placeholder="Input component"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </label>

          <Button className="add-button" type="submit">Create</Button>
        </form>
        
      </div>
    </>
  );
};

export default NewProduct;
