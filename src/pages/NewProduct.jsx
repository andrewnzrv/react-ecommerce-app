import { useState } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = 'https://api.escuelajs.co/api/v1/products';

const NewProduct = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [categoryId, setCategoryId] = useState('')

    const handleSubmit = async event => {
        //prevent the refresh of the page
        event.preventDefault()
        //
        const payload = {
            title,
            description,
            price, 
            categoryId: 1, 
            images: ['https://picsum.photos/200'], 
          };
          
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                
            })
            //console.log(JSON.stringify(payload));
           
            if (response.status === 201) {
                const newProductJson = await response.json(); // Store the JSON data
                console.log(newProductJson);         
                // Redirect to the product detail page
                navigate(`/products/${newProductJson.id}`);
            } else {
                console.log(`Error: ${response.status}`);
            }

            } catch (error) {
              console.log(error);
            }
    }

    return (  
    <>
    <div className="add-grid">
        <h1>New Product</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input value={title} onChange={event => setTitle(event.target.value)} required/>
            </label>
            <label>
                Description:
                <input value={description} onChange={event => setDescription(event.target.value)} required/>
            </label>
            <label>
                Price:
                <input value={price} onChange={event => setPrice(event.target.value)} required/>
            </label>
            
      
            <button type="submit">Create</button>

        </form>
    </div>    

    </>
    )
}
 
export default NewProduct;