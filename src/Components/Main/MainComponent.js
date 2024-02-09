import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProjectCard from '../ProjectCard/ProjectCard';
import "./MainComponent.css"
import CookieUtils from '../../Helper/CookieHelper';

const MainComponent = () => {

  const [projects, setProjects] = useState([]);
  const cookieUtils = new CookieUtils();
  const [reloadProjects, setReloadProjects] = useState(false);

  
  useEffect(() =>{
    const token = cookieUtils.getCookie("userToken")
    axios
      .get('http://localhost:8080/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        setProjects(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [reloadProjects])

  return (
    <div>
        <ul>
          {projects.map(project =>(
            <ProjectCard key={project.id} project={project} setReloadProjects={setReloadProjects} />
          ))}
        </ul>
    </div>
  )
}

export default MainComponent;