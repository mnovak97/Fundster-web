import {React, useEffect, useState } from 'react'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import "./RegisterForm.css";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
    const { t } = useTranslation();
    const [cookie, setCookie] = useCookies(["userToken"]);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: 1,
        profilePictureUrl: "",
        phoneNumber: "",
        password: "",
      });

      const [login, setLogin] = useState({
        email: "",
        password: ""
      })

      useEffect(() => {
        const LoginMail = formData.email;
        const LoginPassword = formData.password;
        setLogin({
          email: LoginMail,
          password: LoginPassword,
        });
      }, [formData.email, formData.password]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/users', formData);
    
            if (response.status === 201) {
                try {
                    const response = await axios.post('http://localhost:8080/api/users/login', login);
                    if (response.status === 200) {
                        const token = response.data.token
                        setCookie("userToken", token, { path: "/" })
                        navigate(from, { replace: true})
                    } else {
                        console.error('Login failed');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                }
            } else {
                console.error('Register failed');
            }
        } catch (error) {
            console.error('Register error:', error);
        }
      };
  return (
    <>
      <div className="container">
        <h2>{t('register')}</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <label htmlFor="name">{t('nameRegister')}</label>
          <input
            name="name"
            type="text"
            id="name"
            autoComplete="off"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <label htmlFor="email">{t('emailRegister')}</label>
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="off"
            onChange={handleChange}
            value={formData.email}
            required
          />

          <label htmlFor="tel">
            {t('telRegister')}
          </label>
          <input
            name="phoneNumber"
            type="tel"
            id="tel"
            autoComplete="off"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
          />

          <label htmlFor="password">
            {t('passwordRegister')}
          </label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            disabled={
              !formData.name || !formData.email
                ? true
                : false
            }
          >
            {t('register')}
          </button>
        </form>
        <p>
          {t('registerQuestion')}
          <br />
          <span className="line">{<Link to="/login">{t('login')}</Link>}</span>
        </p>
      </div>
    </>
  )
}

export default RegisterForm