import React, { useState } from 'react';
import ProgressBarCustom from '../ProgressBar/ProgressBarCustom';
import CustomDetailComponent from '../CustomDetail/CustomDetailComponent';
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import "./ProjectCards.css"

const ProjectCard = ({ project, setReloadProjects }) => {
  const { name, projectPictureUrl, moneyAcquired, moneyGoal } = project;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="project-card">
      <img src={projectPictureUrl} alt={name} onClick={openModal} />
      <div className="project-details">
        <h3>{name}</h3>
        <ProgressBarCustom moneyGoal={moneyGoal} moneyAcquired={moneyAcquired} />
        <div className='customComponents'>
          <CustomDetailComponent project={project} componentType={'backers'} />
          <CustomDetailComponent project={project} componentType={'funded'} />
          <CustomDetailComponent project={project} componentType={'days'} />
        </div>
      </div>
      {showModal && (
        <ProjectDetails project={project} closeModal={closeModal} setReloadProjects={setReloadProjects} />
      )}
    </div>
  );
};

export default ProjectCard;
