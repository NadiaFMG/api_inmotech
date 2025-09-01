import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
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

  // Manejo de campos planos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo de campos anidados (ejemplo: direccion)
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

  // Localizacion
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

  // NDAP
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

  // Municipio
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

  // Barrio, ciudad, corregimiento, vereda
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

  // Designador cardinal
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

  // Manejo de imágenes: sube cada imagen al backend y guarda la respuesta
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

  // División
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

  // Acerca Edificacion
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

  // Tipo Edificacion
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

  // Otras Caracteristicas
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

  // Asignacion
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

  // Organizacion Parqueadero
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

  // Envío del formulario
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

  return (
    <Container className="mt-4">
      <h2>Crear Nueva Propiedad</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Campos principales */}
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" name="Valor" value={property.Valor} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Área</Form.Label>
              <Form.Control type="number" name="Area" value={property.Area} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción General</Form.Label>
              <Form.Control as="textarea" name="Descripcion_General" value={property.Descripcion_General} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Antigüedad</Form.Label>
              <Form.Control type="number" name="Antiguedad" value={property.Antiguedad} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Motivo VoA</Form.Label>
              <Form.Control type="text" name="Motivo_VoA" value={property.Motivo_VoA} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Situación inmueble</Form.Label>
              <Form.Control type="text" name="Situacion_inmueble" value={property.Situacion_inmueble} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Código interno</Form.Label>
              <Form.Control type="text" name="Codigo_interno" value={property.Codigo_interno} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="Estado" value={property.Estado} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" name="Observaciones" value={property.Observaciones} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuario (Platform_user_FK)</Form.Label>
              <Form.Control type="number" name="Platform_user_FK" value={property.Platform_user_FK} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Dirección */}
            <h5>Dirección</h5>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" name="Direccion" value={property.direccion.Direccion} onChange={handleDireccionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de vía</Form.Label>
              <Form.Control type="text" name="Tipo_via" value={property.direccion.Tipo_via} onChange={handleDireccionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número vía principal</Form.Label>
              <Form.Control type="number" name="Numero_via_principal" value={property.direccion.Numero_via_principal} onChange={handleDireccionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número calle transversal</Form.Label>
              <Form.Control type="number" name="Numero_calle_transversal" value={property.direccion.Numero_calle_transversal} onChange={handleDireccionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número edificación</Form.Label>
              <Form.Control type="number" name="Numero_edificacion" value={property.direccion.Numero_edificacion} onChange={handleDireccionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción adicional</Form.Label>
              <Form.Control type="text" name="Descripcion_adicional" value={property.direccion.Descripcion_adicional} onChange={handleDireccionChange} />
            </Form.Group>
            {/* NDAP */}
            <h6>NDAP</h6>
            <Form.Group className="mb-3">
              <Form.Label>Descripción NDAP</Form.Label>
              <Form.Control type="text" name="Ndap_descripcion" value={property.direccion.ndap.Ndap_descripcion} onChange={handleNdapChange} />
            </Form.Group>
            {/* Municipio */}
            <h6>Municipio</h6>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Municipio</Form.Label>
              <Form.Control type="text" name="Municipio_nombre" value={property.direccion.municipio.Municipio_nombre} onChange={handleMunicipioChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción Municipio</Form.Label>
              <Form.Control type="text" name="Municipio_descripcion" value={property.direccion.municipio.Municipio_descripcion} onChange={handleMunicipioChange} />
            </Form.Group>
            {/* Barrio, Ciudad, Corregimiento, Vereda */}
            <h6>Barrio/Ciudad/Corregimiento/Vereda</h6>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Barrio</Form.Label>
              <Form.Control type="text" name="Nombre_barrio" value={property.direccion.barrio_ciudad_corregimiento_vereda.barrio.Nombre_barrio} onChange={e => handleBCCVChange('barrio', e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" name="Ciudad" value={property.direccion.barrio_ciudad_corregimiento_vereda.ciudad.Ciudad} onChange={e => handleBCCVChange('ciudad', e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Corregimiento</Form.Label>
              <Form.Control type="text" name="Corregimiento" value={property.direccion.barrio_ciudad_corregimiento_vereda.corregimiento.Corregimiento} onChange={e => handleBCCVChange('corregimiento', e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vereda</Form.Label>
              <Form.Control type="text" name="Vereda_nombre" value={property.direccion.barrio_ciudad_corregimiento_vereda.vereda.Vereda_nombre} onChange={e => handleBCCVChange('vereda', e)} />
            </Form.Group>
            {/* Localización */}
            <h6>Localización</h6>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="Localizacion_descripcion" value={property.direccion.localizacion.Localizacion_descripcion} onChange={handleLocalizacionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Latitud</Form.Label>
              <Form.Control type="number" name="Latitud" value={property.direccion.localizacion.Latitud} onChange={handleLocalizacionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Longitud</Form.Label>
              <Form.Control type="number" name="Longitud" value={property.direccion.localizacion.Longitud} onChange={handleLocalizacionChange} required />
            </Form.Group>
            {/* Designador Cardinal */}
            <h6>Designador Cardinal</h6>
            <Form.Group className="mb-3">
              <Form.Label>Cardinalidad</Form.Label>
              <Form.Control type="text" name="Cardinalidad" value={property.direccion.designador_cardinal.Cardinalidad} onChange={handleDesignadorChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Abreviación</Form.Label>
              <Form.Control type="text" name="Abreviacion" value={property.direccion.designador_cardinal.Abreviacion} onChange={handleDesignadorChange} />
            </Form.Group>
          </Col>
        </Row>
        {/* Imágenes */}
        <h5>Imágenes</h5>
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar imágenes</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
        {property.imagenes_inmueble.map((img, idx) => (
          <div key={idx} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
            <div>
              <strong>Nombre:</strong> {img.Nombre}
            </div>
            <div>
              <strong>URL:</strong> <a href={img.URL} target="_blank" rel="noopener noreferrer">{img.URL}</a>
            </div>
            <div>
              <strong>Archivo Imagen:</strong> {img.Imagenes}
            </div>
            {img.URL && (
              <img src={img.URL} alt={img.Nombre} style={{ maxWidth: 100, marginTop: 5 }} />
            )}
          </div>
        ))}
        {/* División */}
        <h5>División</h5>
        {Object.keys(initialProperty.division).map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.division[key]} onChange={handleDivisionChange} />
          </Form.Group>
        ))}
        {/* Acerca Edificación */}
        <h5>Acerca de la Edificación</h5>
        {Object.keys(initialProperty.acerca_edificacion).map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.acerca_edificacion[key]} onChange={handleAcercaChange} />
          </Form.Group>
        ))}
        {/* Tipo Edificación */}
        <h5>Tipo Edificación</h5>
        {Object.keys(initialProperty.tipo_edificacion).map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.tipo_edificacion[key]} onChange={handleTipoEdificacionChange} />
          </Form.Group>
        ))}
        {/* Otras Características */}
        <h5>Otras Características</h5>
        {Object.keys(initialProperty.otras_caracteristicas).filter(key => key !== 'asignacion' && key !== 'organizacion_parqueadero').map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.otras_caracteristicas[key]} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
        ))}
        {/* Asignación */}
        <h6>Asignación</h6>
        {Object.keys(initialProperty.otras_caracteristicas.asignacion).map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.otras_caracteristicas.asignacion[key]} onChange={handleAsignacionChange} />
          </Form.Group>
        ))}
        {/* Organización Parqueadero */}
        <h6>Organización Parqueadero</h6>
        {Object.keys(initialProperty.otras_caracteristicas.organizacion_parqueadero).map(key => (
          <Form.Group className="mb-3" key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" name={key} value={property.otras_caracteristicas.organizacion_parqueadero[key]} onChange={handleOrgParqueaderoChange} />
          </Form.Group>
        ))}
        <div>
          <Button variant="primary" type="submit">
            Crear Propiedad
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateProperty;