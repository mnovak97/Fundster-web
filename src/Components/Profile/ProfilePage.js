import {React, useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import CookieUtils from "../../Helper/CookieHelper";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
    profilePictureUrl: "",
    phoneNumber: "",
    password: "",
    projects: [],
    favouriteProjects: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const cookieHelper = new CookieUtils()
      const token = cookieHelper.getCookie("userToken")
      const decoded = cookieHelper.parseJwt(token)
      const userId = decoded.user_id
      try {
        axios
        .get(`http://localhost:8080/api/users/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
          setFormData(response.data)
        })
      .catch(error => {
        console.log(error);
      })
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookieHelper = new CookieUtils()
    const token = cookieHelper.getCookie("userToken")
    const decoded = cookieHelper.parseJwt(token)
    const userId = decoded.user_id
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      
      if (response.status === 204) {
        console.log('User data updated successfully');
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </label>
          <label>
            Phone Number
            <input
              type="tel"
              name="telephone"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </label>
          <button type="submit">Update data</button>
        </form>
    </div>
  )
}

export default ProfilePage