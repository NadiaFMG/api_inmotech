import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { usersService } from '../../services/api';

const Users = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ Username: '', Password: '', Platform_user_status_FK: '', Platform_role_FK: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ Username: '', Password: '', Platform_user_status_FK: '', Platform_role_FK: '' });

  const fetchData = async () => {
    const res = await usersService.getAll();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = (row) => {
    setModalData(row);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setModalData(row);
    setForm({
      Username: row.Username,
      Password: '', // No se muestra el password
      Platform_user_status_FK: row.Platform_user_status_FK,
      Platform_role_FK: row.Platform_role_FK
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      await usersService.delete(id);
      fetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = { ...form };
    if (!updateData.Password) delete updateData.Password;
    await usersService.update(modalData.Platform_user_id, updateData);
    setShowModal(false);
    fetchData();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await usersService.create(createForm);
    setShowCreate(false);
    setCreateForm({ Username: '', Password: '', Platform_user_status_FK: '', Platform_role_FK: '' });
    fetchData();
  };

  return (
    <div>
      <h2 className="mb-4">Administración de Usuarios</h2>
      <Button className="mb-3" variant="success" onClick={() => setShowCreate(true)}>
        + Nuevo Usuario
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Status</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.Platform_user_id}>
              <td>{row.Platform_user_id}</td>
              <td>{row.Username}</td>
              <td>{row.Platform_user_status_FK}</td>
              <td>{row.Platform_role_FK}</td>
              <td>
                <Button size="sm" variant="info" className="me-2" onClick={() => handleShow(row)}>Ver</Button>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(row)}>Actualizar</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(row.Platform_user_id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Ver/Actualizar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Actualizar' : 'Detalle'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && !editMode && (
            <div>
              <p><strong>ID:</strong> {modalData.Platform_user_id}</p>
              <p><strong>Username:</strong> {modalData.Username}</p>
              <p><strong>Status:</strong> {modalData.Platform_user_status_FK}</p>
              <p><strong>Rol:</strong> {modalData.Platform_role_FK}</p>
              <p><strong>Creado:</strong> {modalData.Created_at}</p>
              <p><strong>Actualizado:</strong> {modalData.Updated_at}</p>
            </div>
          )}
          {modalData && editMode && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={form.Username}
                  onChange={e => setForm({ ...form, Username: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password (dejar vacío para no cambiar)</Form.Label>
                <Form.Control
                  type="password"
                  value={form.Password}
                  onChange={e => setForm({ ...form, Password: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="number"
                  value={form.Platform_user_status_FK}
                  onChange={e => setForm({ ...form, Platform_user_status_FK: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="number"
                  value={form.Platform_role_FK}
                  onChange={e => setForm({ ...form, Platform_role_FK: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">Guardar Cambios</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal Crear */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={createForm.Username}
                onChange={e => setCreateForm({ ...createForm, Username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={createForm.Password}
                onChange={e => setCreateForm({ ...createForm, Password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="number"
                value={createForm.Platform_user_status_FK}
                onChange={e => setCreateForm({ ...createForm, Platform_user_status_FK: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="number"
                value={createForm.Platform_role_FK}
                onChange={e => setCreateForm({ ...createForm, Platform_role_FK: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">Crear</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;