import {React, useState} from 'react'
import "./ProjectDetails.css"
import ProgressBarCustom from '../ProgressBar/ProgressBarCustom'
import CustomDetailComponent from '../CustomDetail/CustomDetailComponent'
import axios from 'axios'
import CookieUtils from '../../Helper/CookieHelper'
import { useTranslation } from "react-i18next";

const ProjectDetails = ({project, closeModal, setReloadProjects}) => {
    const {id, projectPictureUrl, name, description, moneyGoal, moneyAcquired} = project
    const { t } = useTranslation();
    const cookieHandler = new CookieUtils();
    const role = cookieHandler.getCookie("userRole");
    const userIsAuthorizedToDelete = role === 'ADMIN';
    const [showBackModal, setShowBackModal] = useState(false);
    const [backAmount, setBackAmount] = useState('');

    const handleDelete = async () => {
      try {
        const token = cookieHandler.getCookie("userToken")
        axios
          .delete(`http://localhost:8080/api/projects/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
          .then(response => {
              if(response.status === 204) {
                console.log("Project deleted!")
                setReloadProjects((prev) => !prev);
              }
          })
          .catch(error => {
            console.log(error);
          })
      } catch (error) {
        console.error('Error deleting project:', error);
      }
      closeModal()
    };

    const handleBackProject = async () => {
      try {
        const token = cookieHandler.getCookie("userToken");
        const updatedProject = {
          ...project,
          moneyAcquired: moneyAcquired + parseFloat(backAmount),
          backers: project.backers + 1,
        };
    
        await axios.put(`http://localhost:8080/api/projects/${id}`, updatedProject, {
          headers: { "Authorization": `Bearer ${token}` },
        });
    
        console.log(`Successfully backed project with ${backAmount} amount.`);
        closeModal();
        setReloadProjects((prev) => !prev);
      } catch (error) {
        console.error('Error backing project:', error);
      }
    };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>X</button>
        <img src={projectPictureUrl} alt={name} />
        <div className="project-info">
            <h2>{name}</h2>
            <ProgressBarCustom moneyAcquired={moneyAcquired} moneyGoal={moneyGoal} />
            <div className="custom-components">
                <CustomDetailComponent project={project} componentType={'backers'} />
                <CustomDetailComponent project={project} componentType={'funded'} />
                <CustomDetailComponent project={project} componentType={'days'} />
            </div>
            <div className="project-desc">
                <p>{description}</p>
            </div>
            <div className="button-container">
            <button className="back-btn" onClick={() => setShowBackModal(true)}>
              {t('backProject')}
            </button>
            {userIsAuthorizedToDelete && (
              <button className="delete-btn" onClick={handleDelete}>
                {t('deleteProject')}
              </button>
            )}
          </div>
        </div>
        {showBackModal && (
        <div className="back-modal">
          <h3>{t('backProject')}</h3>
          <label>
            {t('enterBackAmount')}:
            <input
              type="number"
              value={backAmount}
              onChange={(e) => setBackAmount(e.target.value)}
            />
          </label>
          <button onClick={handleBackProject}>{t('confirmBack')}</button>
          <button onClick={() => setShowBackModal(false)}>{t('cancel')}</button>
        </div>
      )}
      </div>
    </div>
  )
}

export default ProjectDetails