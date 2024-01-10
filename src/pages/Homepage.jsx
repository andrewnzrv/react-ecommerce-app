import "@mantine/core/styles.css";
import { Button } from "@mantine/core";

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="content">
                <div className="text-section">
                    <h4>
                        <span className="thin-text">Revolutionize Your Shopping Experience:</span> Dive into a World of Endless Choices!
                    </h4>
                    <Button variant="filled" size="lg">View all our products</Button>
                </div>
                <div className="image-section">
                    <img className="hero-image" src="/src/image.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}
 
export default Homepage;