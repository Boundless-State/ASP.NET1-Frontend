import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getStatuses } from '../../services/statusService';
import { getClients } from '../../services/clientService';

const AddProjectModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    statusId: '',
    clientId: ''
  });

  const [statuses, setStatuses] = useState([]);
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [statusRes, clientRes] = await Promise.all([
          getStatuses(),
          getClients()
        ]);
        setStatuses(statusRes.data);
        setClients(clientRes.data);
      } catch (err) {
        console.error("Kunde inte ladda dropdowns", err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Project name is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.statusId) newErrors.statusId = "Status is required";
    if (!formData.clientId) newErrors.clientId = "Client is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    const newProject = {
      projectName: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget) || 0,
      statusId: parseInt(formData.statusId),
      clientId: formData.clientId,
      userId: userId
    };

    onAdd(newProject);
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <header className="modal-header">
          <h2>Add Project</h2>
          <button className="btn-close" onClick={onClose}></button>
        </header>

        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Project name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="field-validation-error">{errors.name}</div>}

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <div className="field-validation-error">{errors.startDate}</div>}

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <div className="field-validation-error">{errors.endDate}</div>}

            <div className="form-group">
              <label>Status</label>
              <select name="statusId" value={formData.statusId} onChange={handleChange}>
                <option value="">-- Välj status --</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.statusName}</option>
                ))}
              </select>
              {errors.statusId && <div className="field-validation-error">{errors.statusId}</div>}
            </div>

            <div className="form-group">
              <label>Client</label>
              <select name="clientId" value={formData.clientId} onChange={handleChange}>
                <option value="">-- Välj klient --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.clientName}</option>
                ))}
              </select>
              {errors.clientId && <div className="field-validation-error">{errors.clientId}</div>}
            </div>

            <div className="btn-group justify-end">
              <button type="button" onClick={onClose} className="btn bg-gray">Cancel</button>
              <button type="submit" className="btn btn-submit">Add</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddProjectModal;
