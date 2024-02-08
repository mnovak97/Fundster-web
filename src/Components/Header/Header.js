import React from 'react'
import "./Header.css"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Header = () => {

    const [cookie, removeCookie] = useCookies(["userToken"]);
    const navigate = useNavigate();

    const logOut = () => {
        removeCookie("userToken");
        navigate("/login");
    };

  return (
    <nav>
        <div className="fundsterLogo">
            <span className="logo-text">Fundster</span>
            <span className="logo-overlay">ster</span>
        </div>
        <ul>
            <li><Link to="/">Projects</Link></li>
            <li><Link to="/userProjects">Your projects</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li onClick={logOut}><a>Log Out</a></li>
        </ul>
    </nav>
  )
}

export default Header