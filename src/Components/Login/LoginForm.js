import {React, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import "./LoginForm.css";
import CookieUtils from "../../Helper/CookieHelper";
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();
    const [cookie, setCookie] = useCookies(["userToken"]);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const cookieHandler = new CookieUtils()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
    
            if (response.status === 200) {
                const token = response.data.token
                const decoded = cookieHandler.parseJwt(token)
                const userId = decoded.user_id
                axios
                .get(`http://localhost:8080/api/users/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(response => {
                  setCookie("userRole", response.data.role, {path: "/"})
                })
                .catch(error => {
                  console.log(error);
                })
                setCookie("userToken", token, { path: "/" })
                navigate(from, { replace: true})
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
      };

      return (
        
      <div className="container-login">
        <div className="wrapper">
            <div className="fundster-text">
                <span className="main-text">Fundster</span>
                <span className="overlay-text">ster</span>
            </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder= {t('emailPlaceholder')}
            />
          </label>
          <label>
            {t('password')}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder= {t('passwordPlaceholder')}
            />
          </label>
          <button type="submit">{t('login')}</button>
        </form>
        <p>
          {t('account')}
          <br />
          <span className="line">{<Link to="/register">{t('signUp')}</Link>}</span>
        </p>
      </div>
    </div>
      );
};

export default LoginForm;