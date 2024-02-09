import React from 'react'
import "./Header.css"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Header = () => {
    const { t } = useTranslation();
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
            <li><Link to="/">{t('projects')}</Link></li>
            <li><Link to="/userProjects">{t('myProjects')}</Link></li>
            <li><Link to="/profile">{t('profile')}</Link></li>
            <li onClick={logOut}><a>{t('logOut')}</a></li>
        </ul>
    </nav>
  )
}

export default Header