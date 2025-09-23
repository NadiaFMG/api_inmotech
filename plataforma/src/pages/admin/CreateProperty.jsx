import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/api';

const initialProperty = {
  Valor: '',
  Area: '',
  Descripcion_General: '',
  Antiguedad: '',
  Motivo_VoA: '',
  Situacion_inmueble: '',
  Codigo_interno: '',
  Estado: '',
  Observaciones: '',
  Platform_user_FK: '',
  direccion: {
    Direccion: '',
    Tipo_via: '',
    Numero_via_principal: '',
    Numero_calle_transversal: '',
    Numero_edificacion: '',
    Descripcion_adicional: '',
    Activo: 1,
    ndap: {
      Ndap_descripcion: '',
      Activo: 1
    },
    municipio: {
      Municipio_nombre: '',
      Municipio_descripcion: '',
      Activo: 1
    },
    barrio_ciudad_corregimiento_vereda: {
      barrio: { Nombre_barrio: '' },
      ciudad: { Ciudad: '', Activo: 1 },
      corregimiento: { Corregimiento: '', Activo: 1 },
      vereda: { Vereda_nombre: '', Activo: 1 }
    },
    localizacion: {
      Localizacion_descripcion: '',
      Latitud: '',
      Longitud: '',
      Activo: 1
    },
    designador_cardinal: {
      Cardinalidad: '',
      Abreviacion: '',
      Activo: 1
    }
  },
  imagenes_inmueble: [],
  division: {
    Division: '',
    Balcon: '',
    Baños: '',
    Terraza: '',
    Habitaciones: '',
    Garaje: '',
    Ascensores: '',
    Area: '',
    Closets: '',
    Estudio: '',
    Sala: '',
    Comedor: '',
    Cocina: '',
    Zona_lavanderia: '',
    Deposito: '',
    Descripcion_adicional: ''
  },
  acerca_edificacion: {
    AcercaDeLaEdificacion: '',
    Estrato: '',
    Tipo_construccion: '',
    Anio_construccion: '',
    Estado_conservacion: '',
    Zona_comun: '',
    Descripcion_adicional: ''
  },
  tipo_edificacion: {
    Tipo_edificacion_categoria: '',
    Tipo_edificacion_descripcion: '',
    Tipo_edificacion_niveles: '',
    Tipo_edificacion_activo: 1
  },
  otras_caracteristicas: {
    Caracteristicas_descripcion: '',
    Deposito: '',
    Lavanderia: '',
    Gas: '',
    Piso: '',
    Mascotas_permitidas: '',
    Tipo_inmueble: '',
    Amoblado: '',
    Descripcion_adicional: '',
    asignacion: {
      Parqueaderos_asignados: [],
      Organizacion_parqueadero_FK: '',
      Disponible: '',
      Descripcion: ''
    },
    organizacion_parqueadero: {
      Tipo_parqueadero: '',
      Cantidad: '',
      Cubierto: '',
      Disponible: ''
    }
  }
};

const CreateProperty = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [property, setProperty] = useState(initialProperty);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        [name]: value
      }
    }));
  };
  const handleLocalizacionChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        localizacion: {
          ...prev.direccion.localizacion,
          [name]: value
        }
      }
    }));
  };
  const handleNdapChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        ndap: {
          ...prev.direccion.ndap,
          [name]: value
        }
      }
    }));
  };
  const handleMunicipioChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        municipio: {
          ...prev.direccion.municipio,
          [name]: value
        }
      }
    }));
  };
  const handleBCCVChange = (type, e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        barrio_ciudad_corregimiento_vereda: {
          ...prev.direccion.barrio_ciudad_corregimiento_vereda,
          [type]: {
            ...prev.direccion.barrio_ciudad_corregimiento_vereda[type],
            [name]: value
          }
        }
      }
    }));
  };
  const handleDesignadorChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        designador_cardinal: {
          ...prev.direccion.designador_cardinal,
          [name]: value
        }
      }
    }));
  };
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const nuevasImagenes = await Promise.all(files.map(async (file) => {
      const response = await propertyService.uploadImage(file);
      const data = response.data;
      return {
        Imagenes: data.archivo,
        Nombre: data.nombre,
        URL: data.url
      };
    }));
    setProperty(prev => ({
      ...prev,
      imagenes_inmueble: [...prev.imagenes_inmueble, ...nuevasImagenes]
    }));
  };
  const handleDivisionChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      division: {
        ...prev.division,
        [name]: value
      }
    }));
  };
  const handleAcercaChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      acerca_edificacion: {
        ...prev.acerca_edificacion,
        [name]: value
      }
    }));
  };
  const handleTipoEdificacionChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      tipo_edificacion: {
        ...prev.tipo_edificacion,
        [name]: value
      }
    }));
  };
  const handleOtrasCaracteristicasChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      otras_caracteristicas: {
        ...prev.otras_caracteristicas,
        [name]: value
      }
    }));
  };
  const handleAsignacionChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      otras_caracteristicas: {
        ...prev.otras_caracteristicas,
        asignacion: {
          ...prev.otras_caracteristicas.asignacion,
          [name]: value
        }
      }
    }));
  };
  const handleOrgParqueaderoChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      otras_caracteristicas: {
        ...prev.otras_caracteristicas,
        organizacion_parqueadero: {
          ...prev.otras_caracteristicas.organizacion_parqueadero,
          [name]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...property,
        Valor: Number(property.Valor),
        Area: Number(property.Area),
        Antiguedad: Number(property.Antiguedad),
        Platform_user_FK: Number(property.Platform_user_FK),
        imagenes_inmueble: property.imagenes_inmueble.map(img => ({
          ...img
        }))
      };
      await propertyService.createAnidado(payload);
      navigate('/admin/inmuebles', { state: { refresh: true } });
    } catch (error) {
      setError(error.response?.data?.mensaje || 'Error al crear la propiedad');
    }
  };

  // Agrupa cada sección como un elemento de un array
  const grupos = [
    {
      titulo: 'Datos principales',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Valor</Form.Label>
            <Form.Control type="number" name="Valor" value={property.Valor} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Área</Form.Label>
            <Form.Control type="number" name="Area" value={property.Area} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripción General</Form.Label>
            <Form.Control as="textarea" name="Descripcion_General" value={property.Descripcion_General} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Antigüedad</Form.Label>
            <Form.Control type="number" name="Antiguedad" value={property.Antiguedad} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Motivo VoA</Form.Label>
            <Form.Control type="text" name="Motivo_VoA" value={property.Motivo_VoA} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Situación inmueble</Form.Label>
            <Form.Control type="text" name="Situacion_inmueble" value={property.Situacion_inmueble} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Código interno</Form.Label>
            <Form.Control type="text" name="Codigo_interno" value={property.Codigo_interno} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Estado</Form.Label>
            <Form.Control type="text" name="Estado" value={property.Estado} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Observaciones</Form.Label>
            <Form.Control as="textarea" name="Observaciones" value={property.Observaciones} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Usuario (Platform_user_FK)</Form.Label>
            <Form.Control type="number" name="Platform_user_FK" value={property.Platform_user_FK} onChange={handleChange} required />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'Dirección',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Dirección</Form.Label>
            <Form.Control type="text" name="Direccion" value={property.direccion.Direccion} onChange={handleDireccionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Tipo de vía</Form.Label>
            <Form.Control type="text" name="Tipo_via" value={property.direccion.Tipo_via} onChange={handleDireccionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Número vía principal</Form.Label>
            <Form.Control type="number" name="Numero_via_principal" value={property.direccion.Numero_via_principal} onChange={handleDireccionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Número calle transversal</Form.Label>
            <Form.Control type="number" name="Numero_calle_transversal" value={property.direccion.Numero_calle_transversal} onChange={handleDireccionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Número edificación</Form.Label>
            <Form.Control type="number" name="Numero_edificacion" value={property.direccion.Numero_edificacion} onChange={handleDireccionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripción adicional</Form.Label>
            <Form.Control type="text" name="Descripcion_adicional" value={property.direccion.Descripcion_adicional} onChange={handleDireccionChange} />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'NDAP',
      contenido: (
        <Form.Group className="mb-3">
          <Form.Label className="card-label">Descripción NDAP</Form.Label>
          <Form.Control type="text" name="Ndap_descripcion" value={property.direccion.ndap.Ndap_descripcion} onChange={handleNdapChange} />
        </Form.Group>
      )
    },
    {
      titulo: 'Municipio',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Nombre Municipio</Form.Label>
            <Form.Control type="text" name="Municipio_nombre" value={property.direccion.municipio.Municipio_nombre} onChange={handleMunicipioChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripción Municipio</Form.Label>
            <Form.Control type="text" name="Municipio_descripcion" value={property.direccion.municipio.Municipio_descripcion} onChange={handleMunicipioChange} />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'Barrio/Ciudad/Corregimiento/Vereda',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Nombre Barrio</Form.Label>
            <Form.Control type="text" name="Nombre_barrio" value={property.direccion.barrio_ciudad_corregimiento_vereda.barrio.Nombre_barrio} onChange={e => handleBCCVChange('barrio', e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Ciudad</Form.Label>
            <Form.Control type="text" name="Ciudad" value={property.direccion.barrio_ciudad_corregimiento_vereda.ciudad.Ciudad} onChange={e => handleBCCVChange('ciudad', e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Corregimiento</Form.Label>
            <Form.Control type="text" name="Corregimiento" value={property.direccion.barrio_ciudad_corregimiento_vereda.corregimiento.Corregimiento} onChange={e => handleBCCVChange('corregimiento', e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Vereda</Form.Label>
            <Form.Control type="text" name="Vereda_nombre" value={property.direccion.barrio_ciudad_corregimiento_vereda.vereda.Vereda_nombre} onChange={e => handleBCCVChange('vereda', e)} />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'Localización',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripción</Form.Label>
            <Form.Control type="text" name="Localizacion_descripcion" value={property.direccion.localizacion.Localizacion_descripcion} onChange={handleLocalizacionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Latitud</Form.Label>
            <Form.Control type="number" name="Latitud" value={property.direccion.localizacion.Latitud} onChange={handleLocalizacionChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Longitud</Form.Label>
            <Form.Control type="number" name="Longitud" value={property.direccion.localizacion.Longitud} onChange={handleLocalizacionChange} required />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'Designador Cardinal',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Cardinalidad</Form.Label>
            <Form.Control type="text" name="Cardinalidad" value={property.direccion.designador_cardinal.Cardinalidad} onChange={handleDesignadorChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Abreviación</Form.Label>
            <Form.Control type="text" name="Abreviacion" value={property.direccion.designador_cardinal.Abreviacion} onChange={handleDesignadorChange} />
          </Form.Group>
        </>
      )
    },
    {
      titulo: 'Imágenes',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Seleccionar imágenes</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          {property.imagenes_inmueble.map((img, idx) => (
            <div key={idx} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10, background: '#15365FFF', color: '#FDFDFDFF', borderRadius: 8 }}>
              <div>
                <strong>Nombre:</strong> {img.Nombre}
              </div>
              <div>
                <strong>URL:</strong> <a href={img.URL} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF' }}>{img.URL}</a>
              </div>
              <div>
                <strong>Archivo Imagen:</strong> {img.Imagenes}
              </div>
              {img.URL && (
                <img src={img.URL} alt={img.Nombre} style={{ maxWidth: 100, marginTop: 5, borderRadius: 4 }} />
              )}
            </div>
          ))}
        </>
      )
    },
    {
      titulo: 'División',
      contenido: (
        <>
          {Object.keys(initialProperty.division).map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.division[key]} onChange={handleDivisionChange} />
            </Form.Group>
          ))}
        </>
      )
    },
    {
      titulo: 'Acerca de la Edificación',
      contenido: (
        <>
          {Object.keys(initialProperty.acerca_edificacion).map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.acerca_edificacion[key]} onChange={handleAcercaChange} />
            </Form.Group>
          ))}
        </>
      )
    },
    {
      titulo: 'Tipo Edificación',
      contenido: (
        <>
          {Object.keys(initialProperty.tipo_edificacion).map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.tipo_edificacion[key]} onChange={handleTipoEdificacionChange} />
            </Form.Group>
          ))}
        </>
      )
    },
    {
      titulo: 'Otras Características',
      contenido: (
        <>
          {Object.keys(initialProperty.otras_caracteristicas).filter(key => key !== 'asignacion' && key !== 'organizacion_parqueadero').map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.otras_caracteristicas[key]} onChange={handleOtrasCaracteristicasChange} />
            </Form.Group>
          ))}
        </>
      )
    },
    {
      titulo: 'Asignación',
      contenido: (
        <>
          {Object.keys(initialProperty.otras_caracteristicas.asignacion).map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.otras_caracteristicas.asignacion[key]} onChange={handleAsignacionChange} />
            </Form.Group>
          ))}
        </>
      )
    },
    {
      titulo: 'Organización Parqueadero',
      contenido: (
        <>
          {Object.keys(initialProperty.otras_caracteristicas.organizacion_parqueadero).map(key => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="card-label">{key}</Form.Label>
              <Form.Control type="text" name={key} value={property.otras_caracteristicas.organizacion_parqueadero[key]} onChange={handleOrgParqueaderoChange} />
            </Form.Group>
          ))}
        </>
      )
    }
  ];

  // Divide los grupos en dos columnas
  const mitad = Math.ceil(grupos.length / 2);
  const gruposCol1 = grupos.slice(0, mitad);
  const gruposCol2 = grupos.slice(mitad);

  return (
    <Container className="mt-4">
      <h2 className='admin-dashboard-titulo text-center mb-4'>Crear Nueva Propiedad</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <div className="two-columns-grid">
          <div>
            {gruposCol1.map((grupo, idx) => (
              <div className="custom-card mb-4" key={grupo.titulo}>
                <h5 className="card-title">{grupo.titulo}</h5>
                {grupo.contenido}
              </div>
            ))}
          </div>
          <div>
            {gruposCol2.map((grupo, idx) => (
              <div className="custom-card mb-4" key={grupo.titulo}>
                <h5 className="card-title">{grupo.titulo}</h5>
                {grupo.contenido}
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <Button className="btn-crear-propiedad" type="submit">
            Crear Propiedad
          </Button>
        </div>
      </Form>
      <style>{`
  body {
    background: #1C56A7FF;
  }
  .two-columns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .custom-card {
    border-radius: 16px;
    border: 1px solid #5a7ca3;
    background: #15365FFF;
    box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
    padding: 24px;
  }
  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #72A3D1FF;
    margin-bottom: 16px;
  }
  .card-label {
    color: #FDFDFDFF;
  }
  .custom-card input,
  .custom-card textarea,
  .custom-card select {
    background: #1C56A7FF;
    color: #FDFDFDFF;
    border: 1px solid #5a7ca3;
  }
  .custom-card input:focus,
  .custom-card textarea:focus,
  .custom-card select:focus {
    border-color: #72A3D1FF;
    box-shadow: 0 0 0 2px #72A3D1FF33;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .btn-crear-propiedad {
    background: #1C56A7FF;
    color: #FDFDFDFF;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 16px 48px;
    box-shadow: 0 2px 8px rgba(60, 90, 130, 0.15);
    transition: background 0.2s, color 0.2s;
  }
  .btn-crear-propiedad:hover, .btn-crear-propiedad:focus {
    background: #72A3D1FF;
    color: #15365FFF;
  }
`}</style>
    </Container>
  );
};

export default CreateProperty;