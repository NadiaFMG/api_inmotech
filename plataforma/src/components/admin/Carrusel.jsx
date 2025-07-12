import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Image, Carousel } from 'react-bootstrap';
import { carruselService } from '../../services/api';

const Carrusel = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ titulo: '', descripcion: '', imagen_url: '', orden: '', activo: true });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ titulo: '', descripcion: '', imagen_url: '', orden: '', activo: true });
  const [createImageFile, setCreateImageFile] = useState(null);
  const [createImagePreview, setCreateImagePreview] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  const fetchData = async () => {
    const res = await carruselService.getAll();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Solo los activos y ordenados
  const carruselActivos = data
    .filter(item => item.activo)
    .sort((a, b) => Number(a.orden) - Number(b.orden));

  const handleShow = (row) => {
    setModalData(row);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setModalData(row);
    setForm({
      titulo: row.titulo,
      descripcion: row.descripcion || '',
      imagen_url: row.imagen_url || '',
      orden: row.orden || '',
      activo: row.activo !== undefined ? row.activo : true
    });
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
      await carruselService.delete(id);
      fetchData();
    }
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    setCreateImageFile(file);
    if (file) {
      setCreateImagePreview(URL.createObjectURL(file));
    } else {
      setCreateImagePreview(null);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImageFile(file);
    if (file) {
      setEditImagePreview(URL.createObjectURL(file));
    } else {
      setEditImagePreview(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let imagen_url = createForm.imagen_url;

    if (createImageFile) {
      const res = await carruselService.uploadImage(createImageFile);
      const data = res.data;
      imagen_url = data.url || data.imagen_url || data.path;
      if (!imagen_url) {
        alert('No se pudo subir la imagen');
        return;
      }
    }

    await carruselService.create({ ...createForm, imagen_url });
    setShowCreate(false);
    setCreateForm({ titulo: '', descripcion: '', imagen_url: '', orden: '', activo: true });
    setCreateImageFile(null);
    setCreateImagePreview(null);
    fetchData();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let imagen_url = form.imagen_url;

    if (editImageFile) {
      const res = await carruselService.uploadImage(editImageFile);
      const data = res.data;
      imagen_url = data.url || data.imagen_url || data.path;
      if (!imagen_url) {
        alert('No se pudo subir la imagen');
        return;
      }
    }

    await carruselService.update(modalData.id, { ...form, imagen_url });
    setShowModal(false);
    setEditImageFile(null);
    setEditImagePreview(null);
    fetchData();
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:3000${url}`;
  };

  return (
    <div>
      {/* Carrusel arriba */}
      <Carousel className="mb-4">
        {carruselActivos.map(item => (
          <Carousel.Item key={item.id}>
            {item.imagen_url && (
              <img
                className="d-block w-100"
                src={getImageUrl(item.imagen_url)}
                alt={item.titulo}
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
            )}
            <Carousel.Caption>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2 className="mb-4">Administración Carrusel</h2>
      <Button className="mb-3" variant="success" onClick={() => setShowCreate(true)}>
        + Nuevo Registro
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Orden</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.titulo}</td>
              <td>{row.descripcion}</td>
              <td>
                {row.imagen_url && (
                  <Image
                    src={getImageUrl(row.imagen_url)}
                    alt="Imagen"
                    style={{ maxWidth: 80, maxHeight: 80, objectFit: 'cover' }}
                    rounded
                  />
                )}
              </td>
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
              <p><strong>Título:</strong> {modalData.titulo}</p>
              <p><strong>Descripción:</strong> {modalData.descripcion}</p>
              <p><strong>Imagen:</strong></p>
              {modalData.imagen_url && (
                <Image
                  src={getImageUrl(modalData.imagen_url)}
                  alt="Imagen"
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                  rounded
                  className="mb-2"
                />
              )}
              <p><strong>Orden:</strong> {modalData.orden}</p>
              <p><strong>Activo:</strong> {modalData.activo ? 'Sí' : 'No'}</p>
              <p><strong>Fecha creación:</strong> {modalData.fecha_creacion}</p>
              <p><strong>Fecha actualización:</strong> {modalData.fecha_actualizacion}</p>
            </div>
          )}
          {modalData && editMode && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={form.titulo}
                  onChange={e => setForm({ ...form, titulo: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                {(editImagePreview || form.imagen_url) && (
                  <Image
                    src={editImagePreview || getImageUrl(form.imagen_url)}
                    alt="Vista previa"
                    style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                    rounded
                    className="mt-2"
                  />
                )}
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
          <Modal.Title>Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={createForm.titulo}
                onChange={e => setCreateForm({ ...createForm, titulo: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createForm.descripcion}
                onChange={e => setCreateForm({ ...createForm, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleCreateImageChange}
              />
              {createImagePreview && (
                <Image
                  src={createImagePreview}
                  alt="Vista previa"
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                  rounded
                  className="mt-2"
                />
              )}
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

export default Carrusel;