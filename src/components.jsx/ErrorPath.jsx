import { Link } from "react-router-dom"
import Nav from "./Nav"



const ErrorPath = () => {
    return(
        <section className="error-section">
        <Nav/>
        <div className="error-path set-space">
            <h4>Not Found</h4>
            <img src='404.webp'/>
            <p>Sorry, we could not found the page you are looking for.</p>
            <p>
                <Link className="back-to-home" to='/'><button>Back to Home</button></Link>
            </p>
        </div>
        </section>
    )
}
export default ErrorPath