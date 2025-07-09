import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { preguntasService } from '../../services/api';

const PreguntasFrecuentes = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ pregunta: '', respuesta: '', categoria: '', orden: '', activo: true });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ pregunta: '', respuesta: '', categoria: '', orden: '', activo: true });

  const fetchData = async () => {
    const res = await preguntasService.getAll();
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
      pregunta: row.pregunta,
      respuesta: row.respuesta,
      categoria: row.categoria || '',
      orden: row.orden || '',
      activo: row.activo !== undefined ? row.activo : true
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
      await preguntasService.delete(id);
      fetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await preguntasService.update(modalData.id, form);
    setShowModal(false);
    fetchData();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await preguntasService.create(createForm);
    setShowCreate(false);
    setCreateForm({ pregunta: '', respuesta: '', categoria: '', orden: '', activo: true });
    fetchData();
  };

  return (
    <div>
      <h2 className="mb-4">Administración Preguntas Frecuentes</h2>
      <Button className="mb-3" variant="success" onClick={() => setShowCreate(true)}>
        + Nueva Pregunta
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pregunta</th>
            <th>Categoría</th>
            <th>Orden</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.pregunta}</td>
              <td>{row.categoria}</td>
              <td>{row.orden}</td>
              <td>{row.activo ? 'Sí' : 'No'}</td>
              <td>
                <Button size="sm" variant="info" className="me-2" onClick={() => handleShow(row)}>Ver</Button>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(row)}>Actualizar</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>Eliminar</Button>
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
              <p><strong>ID:</strong> {modalData.id}</p>
              <p><strong>Pregunta:</strong> {modalData.pregunta}</p>
              <p><strong>Respuesta:</strong> {modalData.respuesta}</p>
              <p><strong>Categoría:</strong> {modalData.categoria}</p>
              <p><strong>Orden:</strong> {modalData.orden}</p>
              <p><strong>Activo:</strong> {modalData.activo ? 'Sí' : 'No'}</p>
              <p><strong>Fecha creación:</strong> {modalData.fecha_creacion}</p>
              <p><strong>Fecha actualización:</strong> {modalData.fecha_actualizacion}</p>
            </div>
          )}
          {modalData && editMode && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Pregunta</Form.Label>
                <Form.Control
                  type="text"
                  value={form.pregunta}
                  onChange={e => setForm({ ...form, pregunta: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Respuesta</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.respuesta}
                  onChange={e => setForm({ ...form, respuesta: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={form.categoria}
                  onChange={e => setForm({ ...form, categoria: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Orden</Form.Label>
                <Form.Control
                  type="number"
                  value={form.orden}
                  onChange={e => setForm({ ...form, orden: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Activo</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="¿Activo?"
                  checked={form.activo}
                  onChange={e => setForm({ ...form, activo: e.target.checked })}
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
          <Modal.Title>Nueva Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Pregunta</Form.Label>
              <Form.Control
                type="text"
                value={createForm.pregunta}
                onChange={e => setCreateForm({ ...createForm, pregunta: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Respuesta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createForm.respuesta}
                onChange={e => setCreateForm({ ...createForm, respuesta: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={createForm.categoria}
                onChange={e => setCreateForm({ ...createForm, categoria: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="number"
                value={createForm.orden}
                onChange={e => setCreateForm({ ...createForm, orden: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activo</Form.Label>
              <Form.Check
                type="checkbox"
                label="¿Activo?"
                checked={createForm.activo}
                onChange={e => setCreateForm({ ...createForm, activo: e.target.checked })}
              />
            </Form.Group>
            <Button type="submit" variant="success">Crear</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PreguntasFrecuentes;
