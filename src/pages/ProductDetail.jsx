import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@mantine/core";
import { TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import Cart from "./Cart";

const API_URL = "https://api.escuelajs.co/api/v1/products";

const ProductDetail = ({ setCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  //console.log("this is",product)
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        //console.log(productData)
        setProduct(productData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = () => {
    // add product to the cart
    setCart((cart) => {
      return [...cart, product];
    });
  };
  //console.log("this is the product", productId)

  return (
    <>
      <div className="product-detail">
        <h1>id {productId}</h1>
        {product ? (
          <>
            <div className="product-info">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>
                {product.price} <span>&#8364;</span>{" "}
              </p>
            </div>

            <div className="main-img">
              <img src={product.images[index]} alt="" />
            </div>
            <div className="gallery-img">
              {product.images
                //excludes the image at the current index
                //creates a new array by filtering out elements
                //.filter((i) => i !== index) //filter condition that keeps only the elements for which the index is not equal to the current index.
                .map((src, i) => (
                  <img
                    key={i} //react requires a unique key to update the dom
                    className="img-detail"
                    src={src} //set the source URL from the image
                    alt={product.title}
                    onClick={() => setIndex(i)}
                  />
                ))}
            </div>

            <Link to={`/products/${productId}/update`}>
              <Button className="detail-button" variant="filled" type="button">
                Update
              </Button>
            </Link>

            <Button
              className="detail-button"
              variant="filled"
              type="button"
              onClick={handleDelete}
            >
              Delete Product
            </Button>

            <Button
              className="detail-button"
              variant="filled"
              onClick={handleCart}
              type="button"
            >
              Add to Cart
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetail;
