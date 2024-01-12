import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@mantine/core";
import { TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { Button, Breadcrumbs, Anchor } from "@mantine/core";
import Cart from "./Cart";
import { notifications } from "@mantine/notifications";
import image from "/src/assets/placeholder-img.png";

const API_URL = "https://api.escuelajs.co/api/v1/products";

const ProductDetail = ({ setCart, checked }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const [productTitleBreadcrumbs, setProductTitleBreadcrumbs] = useState("");

  const items = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/product" },
    { title: `${productTitleBreadcrumbs}`, href: `/products/${productId}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        //console.log(productData)
        setProduct(productData);
        setProductTitleBreadcrumbs(productData.title);
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
        {product ? (
          <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <div className="product-info">
              <div className="detail-img-container">
                <div className="gallery-img">
                  {product.images.map((src, i) => (
                    <img
                      key={i}
                      className="img-detail"
                      src={checked ? image : src}
                      alt={product.title}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>

                <div className="main-img">
                  <img src={checked ? image : product.images[index]} alt="" />
                </div>

                <div className="detail-btn-container">
                  <h2>{product.title}</h2>
                  <div className="detail-text">
                    <p>{product.description}</p>
                  </div>
                  <p className="price-detail">
                    {product.price} <span>&#8364;</span>{" "}
                  </p>

                  <Link to={`/products/${productId}/update`}>
                    <Button
                      className="detail-button"
                      variant="filled"
                      type="button"
                    >
                      Update
                    </Button>
                  </Link>

                  <Button
                    className="detail-button"
                    variant="filled"
                    onClick={() => {
                      handleCart();
                      notifications.show({
                        message: "Product is added to your cart",
                        autoClose: 2000,
                      });
                    }}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    className="detail-button"
                    type="button"
                    onClick={() => {
                      handleDelete();
                      notifications.show({
                        message: "Product is deleted from the store",
                        autoClose: 2000,
                        color: "red",
                      });
                    }}
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetail;
