import React from "react";
import { Link } from "react-router-dom"
import DeleteMedicine from "./DeleteMedicine";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


function MedicineListItem(props) {
    return (
        
        <div className="form-group mb-3">
           <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', width: '70%' }}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={props.medicine.name}
                    />
                </div>
                <div style={{marginRight:"2px", padding:"3px"}}>
                <Link to={"/medicine/medicines/" + props.medicine.id + "/edit"} className="btn btn-primary">
                <FontAwesomeIcon icon={faEdit} />
                </Link>
                </div>
                <div>
                <Link to={"/medicine/medicines/" + props.medicine.id} className="btn btn-info">
                <FontAwesomeIcon icon={faEye} />
                </Link>
                </div>
                <DeleteMedicine medicineId={props.medicine.id} user={props.user} refresh={props.refresh} />
            </div>
        </div>
    );
}

export default MedicineListItem;
