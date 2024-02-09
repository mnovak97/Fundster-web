import {React, useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useTranslation } from "react-i18next";
import CookieUtils from "../../Helper/CookieHelper";

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
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
  const [selectedLanguage, setSelectedLanguage] = useState("en");
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
  const handleLanguageChange = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    setSelectedLanguage(selectedLanguage)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-profile">
      <form onSubmit={handleSubmit} className="profile-form">
          <label>
            {t('name')}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder= {t('emailPlaceholder')}
            />
          </label>
          <label>
            {t('telephone')}
            <input
              type="tel"
              name="telephone"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder={t('telPlaceholder')}
            />
          </label>
          <button type="submit">{t('updateUser')}</button>
          <div className="language-options">
        <label>
          {t("selectLanguage")}:
          <select onChange={(e) => handleLanguageChange(e.target.value)} value={selectedLanguage}>
            <option value="en">English</option>
            <option value="cro">Croatian</option>
          </select>
        </label>
      </div>
        </form>
    </div>
  )
}

export default ProfilePage