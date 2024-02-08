import React from 'react'
import "./ProjectDetails.css"
import ProgressBarCustom from '../ProgressBar/ProgressBarCustom'
import CustomDetailComponent from '../CustomDetail/CustomDetailComponent'

const ProjectDetails = ({project, closeModal}) => {
    const {projectPictureUrl, name, description, moneyGoal, moneyAcquired} = project
    
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
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails