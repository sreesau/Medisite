import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import './Navbar.css'

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    };
    return (
        <div className="navbar">
          <div className="navbar-brand">
            <h4>Medisite</h4>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/aboutus" className="nav-link" activeClassName="active">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/medicine/medicines"
                className="nav-link"
                activeClassName="active"
              >
                Medicines
              </NavLink>
            </li>
          </ul>
            <div className="login">
            {!user &&(
              <button className="register">
                <NavLink to="/register" className="nav-link" activeClassName="active">
                  Register
                </NavLink>
              </button>
            )}
            {user ? (
              <button className="button" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="button">
                <NavLink to= '/login' className="nav-link" activeClassName="active">
                  Login
                </NavLink>
              </button>
            )}
          </div>
        </div>
      );
    }
    
    export default Navbar;