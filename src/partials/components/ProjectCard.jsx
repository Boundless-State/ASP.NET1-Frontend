import React, { useState } from 'react';
import EditProjectModal from './EditProjectModal';

const ProjectCard = ({ project, onDelete, onProjectUpdated }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await onProjectUpdated(id, updatedData); // Callback från Projects.jsx
      setShowEditModal(false);
    } catch (err) {
      console.error("Kunde inte uppdatera projektet", err);
    }
  };

  return (
    <>
      <div className="card-project">
        <div className="card-header">
          <h3>{project.projectName}</h3>
          <div className="dropdown">
            <button className="btn-more" onClick={toggleMenu}>⋮</button>
            {showMenu && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleEdit}>Edit</button>
                <button className="dropdown-item delete" onClick={() => onDelete(project.id)}>Delete</button>
              </div>
            )}
          </div>
        </div>

        <div className="card-body">
          <p><strong>Client:</strong> {project.clientName}</p>
          <p><strong>Status:</strong> {project.statusName}</p>
          <p><strong>Start:</strong> {project.startDate?.substring(0, 10)}</p>
          <p><strong>End:</strong> {project.endDate?.substring(0, 10) || '—'}</p>
        </div>
      </div>

      {showEditModal && (
        <EditProjectModal
          project={project}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
