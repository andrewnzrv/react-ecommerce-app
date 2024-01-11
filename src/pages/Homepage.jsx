import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import React from "react"; 
import image from "/src/assets/image2.jpg"; 


const Homepage = () => {
    return (
        <div className="homepage">
            <div className="content">
                <div className="text-section">
                    <h4>
                        <span className="thin-text">Revolutionize Your Shopping Experience:</span><br/> Dive into a World of Endless Choices!
                    </h4>
                    <Link to="/product">
                        <Button variant="filled" size="lg">View all our products</Button>
                    </Link>    
                </div>
                <div className="image-section">
                    <img className="hero-image" src={image} alt="" />
                </div>
            </div>
        </div>
    );
}
 
export default Homepage;