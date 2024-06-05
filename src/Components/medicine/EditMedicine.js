import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";


function EditMedicine() {
    const { medicineId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        console.log('Fetching medicine details. Medicine ID:', medicineId);
        if (user) {
            axios.get(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`, {
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

    function updateMedicine() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`, {
            name: name,
            company: company,
            expiry_date: expiry_date,
        }, {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            setShowSuccessModal(true);
            console.log('showSuccessModal set to true');
            navigate('/medicine/medicines'); 
        }).catch(error => {
            console.error('Error updating medicine:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Medicine</h1>
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
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={expiry_date}
                                onChange={(event) => { setExpiryDate(event.target.value) }}
                                placeholder="YYYY-MM-DD"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right mt-4" onClick={() => setShowSuccessModal(true)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Confirm Update</h5>
                                <button type="button" className="close mr-5" onClick={() => setShowSuccessModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to update this medicine?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowSuccessModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={updateMedicine}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default checkAuth(EditMedicine);

