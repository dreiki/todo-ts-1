import loading from "./loading.svg"
import './loading.css'
export default function Loading () {
    return(
        <div className="loading-container">
            <h1>Loading</h1>
            <img src={loading} className="loading-animation" alt="loading" />
        </div>
    )
}