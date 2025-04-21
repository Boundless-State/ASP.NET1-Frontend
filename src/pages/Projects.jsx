import React, { useEffect, useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectService';
import ProjectCard from '../partials/components/ProjectCard';
import AddProjectModal from '../partials/components/AddProjectModal';
import ModalButton from '../partials/components/ModalButton';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Kunde inte hämta projekt", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (newProject) => {
    try {
      await createProject(newProject);
      setShowAddModal(false);
      fetchProjects();
    } catch (err) {
      console.error("Kunde inte lägga till projekt", err);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    try {
      await updateProject(id, updatedData);
      fetchProjects();
    } catch (err) {
      console.error("Kunde inte uppdatera projekt", err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error("Kunde inte ta bort projekt", err);
    }
  };

  const filteredProjects =
    activeTab === "completed"
      ? projects.filter(p => p.statusName?.toLowerCase() === "completed")
      : projects;

  return (
    <section className="page-container">
      <header className="page-header">
        <h1>Projects</h1>
        <ModalButton type="add" text="Add Project" onClick={() => setShowAddModal(true)} />
      </header>

      <div className="tab-group">
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
        <button className={`tab ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
      </div>

      <div className="card-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
              onProjectUpdated={handleUpdateProject}
            />
          ))
        ) : (
          <p>Inga projekt att visa.</p>
        )}
      </div>

      {showAddModal && (
        <AddProjectModal
          onAdd={handleCreateProject}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </section>
  );
};

export default Projects;
