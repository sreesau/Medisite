import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import MedicineListItem from "./MedicineListItem";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';


function ListMedicines() {
    const [medicines, setMedicines]=useState([]);
    var [searchTerm, setSearchTerm]=useState('');
    const user = useSelector((state) => state.auth.user);
    function fetchMedicines(){
        if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine',
        {
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setMedicines(response.data)   
        })
        .catch(error => {
            console.error('Error adding medicine:', error);
        });
    }}

    useEffect(()=>{
        fetchMedicines()
    },[])

    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-4">Medicines List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2 ">
                <span className="searchContainer ">
                        <input type="text" placeholder="Seach here...."style={{width:'200px',height:'40px', float: 'right', marginRight:'60px',borderRadius:"5px", border:'none'}} onChange={(event)=>{
                            setSearchTerm(event.target.value)
                        }} />
                        </span>
                    <Link to="/medicine/medicines/create" className="btn" style={{ backgroundColor:'#a52a2a', color:'#ffffff',width:'150px',height:'40px',marginBottom:'6px',}} ><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />
                     Medicine</Link>
                   
                    {medicines.filter((medicine)=>{
                        if (searchTerm === ""){
                            return true;
                        } else if (medicine.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return true;
                          }
                          return false;
                        })
                    .map(medicine =><MedicineListItem key={medicine.id} user={user} medicine={medicine} refresh={fetchMedicines}/>)}
                </div>
            </div>
        </div>
    </div>
)};

export default checkAuth(ListMedicines);