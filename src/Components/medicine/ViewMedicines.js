import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";


function ViewMedicines() {
    var {medicineId} = useParams()
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log('Fetching medicine details. Medicine ID:', medicineId);
        if (user) {
            axios.get(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`,{
                headers: { 'Authorization': `Bearer ${user.token}` }
            }).then(response => {
                setName(response.data.name);
                setCompany(response.data.company);
                setExpiryDate(response.data.expiry_date);

            }).catch(error => {
                console.error('Error fetching medicine details:', error);
            });
        }
    }, [medicineId, user]);

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Name:</label>
                            <div className="form-control">{name}</div>
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <div className="form-control">{company}</div>
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <div className="form-control">{expiry_date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default checkAuth(ViewMedicines) ;