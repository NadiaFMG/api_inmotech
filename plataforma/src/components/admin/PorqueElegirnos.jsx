import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { porqueElegirnosService } from '../../services/api';
// Importa todos los iconos de FontAwesome (puedes cambiar a otra librería si prefieres)
import * as FaIcons from 'react-icons/fa';

const ICONS_LIST = Object.keys(FaIcons)
  .filter(name => name.startsWith('Fa'))
  .map(name => ({ name, icon: React.createElement(FaIcons[name]) }));

const PorqueElegirnos = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ titulo: '', descripcion: '', icono: '', orden: '', activo: true });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ titulo: '', descripcion: '', icono: '', orden: '', activo: true });
  const [iconSearch, setIconSearch] = useState('');
  const [iconSearchEdit, setIconSearchEdit] = useState('');

  const fetchData = async () => {
    const res = await porqueElegirnosService.getAll();
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
      titulo: row.titulo,
      descripcion: row.descripcion,
      icono: row.icono || '',
      orden: row.orden || '',
      activo: row.activo !== undefined ? row.activo : true
    });
    setEditMode(true);
    setShowModal(true);
    setIconSearchEdit('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
      await porqueElegirnosService.delete(id);
      fetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await porqueElegirnosService.update(modalData.id, form);
    setShowModal(false);
    fetchData();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await porqueElegirnosService.create(createForm);
    setShowCreate(false);
    setCreateForm({ titulo: '', descripcion: '', icono: '', orden: '', activo: true });
    fetchData();
  };

  // Renderiza el icono guardado
  const renderIcon = (iconName) => {
    const IconComp = FaIcons[iconName];
    return IconComp ? <IconComp /> : null;
  };

  // Filtrado de iconos por búsqueda
  const filteredIcons = iconSearch
    ? ICONS_LIST.filter(opt => opt.name.toLowerCase().includes(iconSearch.toLowerCase()))
    : [];

  const filteredIconsEdit = iconSearchEdit
    ? ICONS_LIST.filter(opt => opt.name.toLowerCase().includes(iconSearchEdit.toLowerCase()))
    : [];

  return (
    <div>
      <h2 className="mb-4">Administración Porque Elegirnos</h2>
      <Button className="mb-3" variant="success" onClick={() => { setShowCreate(true); setIconSearch(''); }}>
        + Nuevo Registro
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Icono</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.titulo}</td>
              <td>{row.descripcion}</td>
              <td style={{ fontSize: 24 }}>{renderIcon(row.icono)}</td>
              <td>{row.orden}</td>
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
              <p><strong>Icono:</strong> <span style={{ fontSize: 24 }}>{renderIcon(modalData.icono)}</span></p>
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
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Buscar Icono</Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                    placeholder="Buscar icono..."
                    value={iconSearchEdit}
                    onChange={e => setIconSearchEdit(e.target.value)}
                  />
                </InputGroup>
                <Row style={{ maxHeight: 150, overflowY: 'auto' }}>
                  {filteredIconsEdit.map(opt => (
                    <Col xs={2} key={opt.name} className="text-center mb-2">
                      <span
                        style={{
                          fontSize: 28,
                          cursor: 'pointer',
                          border: form.icono === opt.name ? '2px solid #007bff' : '2px solid transparent',
                          borderRadius: 6,
                          padding: 4,
                          display: 'inline-block'
                        }}
                        onClick={() => setForm({ ...form, icono: opt.name })}
                        title={opt.name}
                      >
                        {opt.icon}
                      </span>
                    </Col>
                  ))}
                </Row>
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Buscar Icono</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  placeholder="Buscar icono..."
                  value={iconSearch}
                  onChange={e => setIconSearch(e.target.value)}
                />
              </InputGroup>
              <Row style={{ maxHeight: 150, overflowY: 'auto' }}>
                {filteredIcons.map(opt => (
                  <Col xs={2} key={opt.name} className="text-center mb-2">
                    <span
                      style={{
                        fontSize: 28,
                        cursor: 'pointer',
                        border: createForm.icono === opt.name ? '2px solid #007bff' : '2px solid transparent',
                        borderRadius: 6,
                        padding: 4,
                        display: 'inline-block'
                      }}
                      onClick={() => setCreateForm({ ...createForm, icono: opt.name })}
                      title={opt.name}
                    >
                      {opt.icon}
                    </span>
                  </Col>
                ))}
              </Row>
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

export default PorqueElegirnos;