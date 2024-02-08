import {React, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
    const [cookie, setCookie] = useCookies(["userToken"]);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
        
      <div className="container">
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
              placeholder="Enter email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>
          Dont have an account?
          <br />
          <span className="line">{<Link to="/register">Sign Up</Link>}</span>
        </p>
      </div>
    </div>
      );
};

export default LoginForm;