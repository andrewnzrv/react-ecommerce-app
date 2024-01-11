import "@mantine/core/styles.css";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import React from "react"; 



const error404 = () => {
    return (
        <div className="homepage">
            <div className="content">
                <div className="text-section">
                    <h4>404 - Oops! It seems like you've taken a wrong turn.</h4>
                    <Link to="/product">
                        <Button variant="filled" size="lg">Go to our products!</Button>
                    </Link> 
            </div>
                
            </div>
        </div>
    );
}
 
export default error404;