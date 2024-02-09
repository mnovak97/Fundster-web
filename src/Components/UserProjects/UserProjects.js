import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProjectCard from '../ProjectCard/ProjectCard';
import "./UserProjects.css"
import CreateProjectPage from '../CreateProject/CreateProjectPage';
import CookieUtils from '../../Helper/CookieHelper';
import { useTranslation } from "react-i18next";

const UserProjects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [reloadProjects, setReloadProjects] = useState(false);
    const [userID, setUserID] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const cookieHelper = new CookieUtils()
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setReloadProjects((prev) => !prev);
    };

  useEffect(() => {
    const token = cookieHelper.getCookie('userToken')
    if (token) {
        try {
         const decoded = cookieHelper.parseJwt(token)
         setUserID(decoded.user_id)
        } catch (error) {
          console.error('Token verification error:', error.message);
        }
      }
  }, [reloadProjects])

  const handleCreateProject = () => {
    openModal();
    console.log('Create new project button clicked');
  };
  
  useEffect(() =>{
    const token = cookieHelper.getCookie('userToken')
    axios
      .get('http://localhost:8080/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        const userProjects = response.data.filter(project => project.userID === userID)
        setProjects(userProjects)
      })
      .catch(error => {
        console.log(error);
      })
  }, [userID, reloadProjects])

  return (
    <div>
    <button onClick={handleCreateProject} className="button-style">
      {t('newProject')}
    </button>
    <ul>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} setReloadProjects={setReloadProjects} />
      ))}
    </ul>
    {showModal && (  
        <CreateProjectPage closeModal={closeModal} setReloadProjects={setReloadProjects} />
    )}
  </div>
  )
}

export default UserProjects