import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { sobreNosotrosService } from '../../services/api';

const SobreNosotros = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ titulo: '', descripcion: '', imagen_url: '', activo: true });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ titulo: '', descripcion: '', imagen_url: '', activo: true });
  const [previewImage, setPreviewImage] = useState(null); // Para vista previa en crear
  const [previewEditImage, setPreviewEditImage] = useState(null); // Para vista previa en editar

  const fetchData = async () => {
    const res = await sobreNosotrosService.getAll();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Maneja la subida de imagen para crear y actualizar
  const handleImageUpload = async (file, setUrl, setPreview) => {
    if (setPreview) setPreview(URL.createObjectURL(file));
    try {
      const res = await sobreNosotrosService.uploadImage(file);
      if (res.data && res.data.url) {
        setUrl(res.data.url);
        // NO limpiar la preview aquí, solo cuando se guarde el registro
      } else {
        alert('La imagen no se subió correctamente');
      }
    } catch (err) {
      alert('Error al subir la imagen');
    }
  };

  const handleShow = (row) => {
    setModalData(row);
    setEditMode(false);
    setShowModal(true);
    setPreviewEditImage(null);
  };

  const handleEdit = (row) => {
    setModalData(row);
    setForm({
      titulo: row.titulo,
      descripcion: row.descripcion,
      imagen_url: row.imagen_url || '',
      activo: row.activo !== undefined ? row.activo : true
    });
    setEditMode(true);
    setShowModal(true);
    setPreviewEditImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
      await sobreNosotrosService.delete(id);
      fetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await sobreNosotrosService.update(modalData.id, form);
    setShowModal(false);
    setPreviewEditImage(null); // Aquí sí la limpias
    fetchData();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await sobreNosotrosService.create(createForm);
    setShowCreate(false);
    setCreateForm({ titulo: '', descripcion: '', imagen_url: '', activo: true });
    setPreviewImage(null); // Aquí sí la limpias
    fetchData();
  };

  return (
    <div>
      <h2 className="mb-4">Administración Sobre Nosotros</h2>
      <Button className="mb-3" variant="success" onClick={() => { setShowCreate(true); setPreviewImage(null); }}>
        + Nuevo Registro
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Imagen</th>
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
    <img
      src={`http://localhost:3000${row.imagen_url}`}
      alt="Imagen"
      style={{ maxWidth: 80, maxHeight: 80, objectFit: 'cover' }}
    />
  )}
</td>
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
      <Modal show={showModal} onHide={() => { setShowModal(false); setPreviewEditImage(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Actualizar' : 'Detalle'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && !editMode && (
            <div>
              <p><strong>ID:</strong> {modalData.id}</p>
              <p><strong>Título:</strong> {modalData.titulo}</p>
              <p><strong>Descripción:</strong> {modalData.descripcion}</p>
              <p><strong>Imagen:</strong> {modalData.imagen_url && (
                <img src={modalData.imagen_url} alt="Imagen" style={{ maxWidth: 200, display: 'block' }} />
              )}</p>
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
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={async e => {
                    const file = e.target.files[0];
                    if (file) {
                      await handleImageUpload(
                        file,
                        url => setForm(f => ({ ...f, imagen_url: url })),
                        setPreviewEditImage
                      );
                      e.target.value = ""; // Permite volver a seleccionar la misma imagen
                    }
                  }}
                />
                {/* Vista previa local al editar */}
                {previewEditImage && (
                  <>
                    <img src={previewEditImage} alt="Vista previa" style={{ maxWidth: 200, marginTop: 10 }} />
                    <Button
                      size="sm"
                      variant="secondary"
                      style={{ marginLeft: 10, marginTop: 10 }}
                      onClick={() => setPreviewEditImage(null)}
                    >
                      Quitar vista previa
                    </Button>
                  </>
                )}
                {/* Vista previa desde el servidor si no hay local */}
                {!previewEditImage && form.imagen_url && (
                  <img src={form.imagen_url} alt="Vista previa" style={{ maxWidth: 200, marginTop: 10 }} />
                )}
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
      <Modal show={showCreate} onHide={() => { setShowCreate(false); setPreviewImage(null); }}>
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files[0];
                  if (file) {
                    await handleImageUpload(
                      file,
                      url => setCreateForm(f => ({ ...f, imagen_url: url })),
                      setPreviewImage
                    );
                    e.target.value = ""; // Permite volver a seleccionar la misma imagen
                  }
                }}
              />
              {/* Vista previa local al crear */}
              {previewImage && (
                <img src={previewImage} alt="Vista previa" style={{ maxWidth: 200, marginTop: 10 }} />
              )}
              {/* Vista previa desde el servidor si no hay local */}
              {!previewImage && createForm.imagen_url && (
                <img src={createForm.imagen_url} alt="Vista previa" style={{ maxWidth: 200, marginTop: 10 }} />
              )}
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

export default SobreNosotros;