import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
function CreateMedicine() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    function addMedicine(e) {
        e.preventDefault();
        if(user){
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
            expiry_date: expiry_date 
            },
            {
            headers:{'Authorization':"Bearer "+ user.token}
             }).then(response=>{
            console.log(response.data.message);
            navigate('/medicine/medicines')
        })
        .catch(error => {
            console.error('Error adding medicine:', error);
        });
    }}
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                <form onSubmit={addMedicine}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => { setName(event.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={company}
                                    onChange={(event) => { setCompany(event.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Expiry Date:</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    value={expiry_date}
                                    onChange={(event) => { setExpiryDate(event.target.value) }}
                                    placeholder="YYYY-MM-DD"
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary float-right" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default checkAuth(CreateMedicine);