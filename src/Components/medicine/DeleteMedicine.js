import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function DeleteMedicine({ medicineId, user, refresh }) {
    const [showModal, setShowModal] = useState(false);

    function deleteMedicine() {
        console.log('Deleting medicine. Medicine ID:', medicineId);
        if (user && user.token) {
            axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            .then(response => {
                console.log('Delete response:', response.data);
                setShowModal(true);
                refresh();
            })
            .catch(error => {
                console.error('Error deleting medicine:', error);
            });
        } else {
            console.error('User or token is missing. User:', user);
        }
    }

    return (
        <div style={{ marginLeft: '4px',}}>
            <button className="btn btn-danger" onClick={() => setShowModal(true)} style={{width:'50px'}}>
            <FontAwesomeIcon icon={faTrash} />
            </button>
            {showModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="close mr-5" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this medicine?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={deleteMedicine}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteMedicine;
