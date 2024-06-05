import {useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Aboutus() {
    const navigate = useNavigate();
    function goToHomePage(){
        navigate('/')
    }
    return <div>
        <Navbar></Navbar>
        <div className="container">
            <div className="Row">
                <div className="col-md-6 offset-md-3" style={{fontFamily:'sans-serif', fontSize:'14px',}}>
                    <h1>About Us</h1>
                    <p>
                    Major segments of Indian Pharmaceutical Industry include generic drugs, OTC medicines, bulk drugs, vaccines, contract research & manufacturing, biosimilars and biologics. India is a global leader in the supply of DPT, BCG, and Measles vaccines. India is one of the biggest suppliers of low-cost vaccines in the world.
                    </p>
                    <button className="btn btn-primary" onClick={goToHomePage}>Go Home </button>
                </div>
            </div>
        </div>
    </div>;
}

export default Aboutus;