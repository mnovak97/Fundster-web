import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProjectCard from '../ProjectCard/ProjectCard';
import "./UserProjects.css"
import CreateProjectPage from '../CreateProject/CreateProjectPage';
import CookieUtils from '../../Helper/CookieHelper';

const UserProjects = () => {
    const [projects, setProjects] = useState([]);
    const [userID, setUserID] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const cookieHelper = new CookieUtils()
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
  }, [])

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
  }, [userID])

  return (
    <div>
    <button onClick={handleCreateProject} className="button-style">
      Create New Project
    </button>
    <ul>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
    {showModal && (  
        <CreateProjectPage closeModal={closeModal} />
    )}
  </div>
  )
}

export default UserProjects