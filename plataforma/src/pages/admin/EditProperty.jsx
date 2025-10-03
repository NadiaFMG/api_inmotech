import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { propertyService } from '../../services/api';

// MISMO initialProperty QUE CreateProperty
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

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // OBTENER ID DE LA URL
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(initialProperty);

  // CARGAR DATOS DEL INMUEBLE AL MONTAR EL COMPONENTE
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await propertyService.getById(id);
        console.log('Datos del inmueble cargados:', response);
        
        const propertyData = response.data?.data || response.data || response;
        
        console.log('PropertyData después del mapeo:', propertyData);

        // Mapear los datos al formato del formulario (CORREGIDO PARA BOOLEANOS)
        setProperty({
          Valor: propertyData.Valor || '',
          Area: propertyData.Area || '',
          Descripcion_General: propertyData.Descripcion_General || '',
          Antiguedad: propertyData.Antiguedad || '',
          Motivo_VoA: propertyData.Motivo_VoA || '',
          Situacion_inmueble: propertyData.Situacion_inmueble || '',
          Codigo_interno: propertyData.Codigo_interno || '',
          Estado: propertyData.Estado || '',
          Observaciones: propertyData.Observaciones || '',
          Platform_user_FK: propertyData.Platform_user_FK || '',
          
          direccion: {
            Direccion: propertyData.Direccion?.Direccion || '',
            Tipo_via: propertyData.Direccion?.Tipo_via || '',
            Numero_via_principal: propertyData.Direccion?.Numero_via_principal || '',
            Numero_calle_transversal: propertyData.Direccion?.Numero_calle_transversal || '',
            Numero_edificacion: propertyData.Direccion?.Numero_edificacion || '',
            Descripcion_adicional: propertyData.Direccion?.Descripcion_adicional || '',
            Activo: 1,
            
            ndap: {
              Ndap_descripcion: 
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad?.Municipio?.Ndap?.Ndap_descripcion ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento?.Municipio?.Ndap?.Ndap_descripcion ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda?.Municipio?.Ndap?.Ndap_descripcion ||
                '',
              Activo: 1
            },
            
            municipio: {
              Municipio_nombre: 
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad?.Municipio_nombre ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento?.Municipio?.Municipio_nombre ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda?.Municipio?.Municipio_nombre ||
                '',
              Municipio_descripcion: 
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad?.Municipio?.Municipio_descripcion ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento?.Municipio?.Municipio_descripcion ||
                propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda?.Municipio?.Municipio_descripcion ||
                '',
              Activo: 1
            },
            
            barrio_ciudad_corregimiento_vereda: {
              barrio: { 
                Nombre_barrio: propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Barrio?.Nombre_barrio || '' 
              },
              ciudad: { 
                Ciudad: propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad?.Ciudad || '', 
                Activo: 1 
              },
              corregimiento: { 
                Corregimiento: propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento?.Corregimiento || '', 
                Activo: 1 
              },
              vereda: { 
                Vereda_nombre: propertyData.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda?.Vereda_nombre || '', 
                Activo: 1 
              }
            },
            
            localizacion: {
              Localizacion_descripcion: propertyData.Direccion?.Localizacion?.Localizacion_descripcion || '',
              Latitud: propertyData.Direccion?.Localizacion?.Latitud || '',
              Longitud: propertyData.Direccion?.Localizacion?.Longitud || '',
              Activo: 1
            },
            
            designador_cardinal: {
              Cardinalidad: propertyData.Direccion?.DesignadorCardinal?.Cardinalidad || '',
              Abreviacion: propertyData.Direccion?.DesignadorCardinal?.Abreviacion || '',
              Activo: 1
            }
          },
          
          imagenes_inmueble: Array.isArray(propertyData.ImagenesInmueble) ? [propertyData.ImagenesInmueble] : 
                            (propertyData.ImagenesInmueble ? [propertyData.ImagenesInmueble] : []),
          
          // División (CON CONVERSIÓN DE BOOLEANOS)
          division: {
            Division: propertyData.division?.Division || '',
            Balcon: propertyData.division?.Balcon || '',
            Baños: propertyData.division?.Baños || '',
            Terraza: propertyData.division?.Terraza || '',
            Habitaciones: propertyData.division?.Habitaciones || '',
            Garaje: propertyData.division?.Garaje || '',
            Ascensores: propertyData.division?.Ascensores || '',
            Area: propertyData.division?.Area || '',
            Closets: propertyData.division?.Closets || '',
            // CONVERTIR BOOLEANOS A STRINGS
            Estudio: propertyData.division?.Estudio === 1 || propertyData.division?.Estudio === true ? 'Si' : 'No',
            Sala: propertyData.division?.Sala === 1 || propertyData.division?.Sala === true ? 'Si' : 'No',
            Comedor: propertyData.division?.Comedor === 1 || propertyData.division?.Comedor === true ? 'Si' : 'No',
            Cocina: propertyData.division?.Cocina || '',
            // CONVERTIR BOOLEANOS A STRINGS
            Zona_lavanderia: propertyData.division?.Zona_lavanderia === 1 || propertyData.division?.Zona_lavanderia === true ? 'Si' : 'No',
            Deposito: propertyData.division?.Deposito === 1 || propertyData.division?.Deposito === true ? 'Si' : 'No',
            Descripcion_adicional: propertyData.division?.Descripcion_adicional || ''
          },
          
          // Acerca Edificación (CON CONVERSIÓN DE BOOLEANOS)
          acerca_edificacion: {
            AcercaDeLaEdificacion: propertyData.acercaEdificacion?.AcercaDeLaEdificacion || '',
            Estrato: propertyData.acercaEdificacion?.Estrato || '',
            Tipo_construccion: propertyData.acercaEdificacion?.Tipo_construccion || '',
            Anio_construccion: propertyData.acercaEdificacion?.Anio_construccion || '',
            Estado_conservacion: propertyData.acercaEdificacion?.Estado_conservacion || '',
            // CONVERTIR BOOLEANO A STRING
            Zona_comun: propertyData.acercaEdificacion?.Zona_comun === 1 || propertyData.acercaEdificacion?.Zona_comun === true ? 'Si' : 'No',
            Descripcion_adicional: propertyData.acercaEdificacion?.Descripcion_adicional || ''
          },
          
          tipo_edificacion: {
            Tipo_edificacion_categoria: propertyData.tipoEdificacion?.Tipo_edificacion_categoria || '',
            Tipo_edificacion_descripcion: propertyData.tipoEdificacion?.Tipo_edificacion_descripcion || '',
            Tipo_edificacion_niveles: propertyData.tipoEdificacion?.Tipo_edificacion_niveles || '',
            Tipo_edificacion_activo: 1
          },
          
          // Otras Características (CON CONVERSIÓN DE BOOLEANOS)
          otras_caracteristicas: {
            Caracteristicas_descripcion: propertyData.otrasCaracteristicas?.Caracteristicas_descripcion || '',
            Deposito: propertyData.otrasCaracteristicas?.Deposito || '',
            // CONVERTIR BOOLEANOS A STRINGS
            Lavanderia: propertyData.otrasCaracteristicas?.Lavanderia === 1 || propertyData.otrasCaracteristicas?.Lavanderia === true ? 'Si' : 'No',
            Gas: propertyData.otrasCaracteristicas?.Gas === 1 || propertyData.otrasCaracteristicas?.Gas === true ? 'Si' : 'No',
            Piso: propertyData.otrasCaracteristicas?.Piso || '',
            Mascotas_permitidas: propertyData.otrasCaracteristicas?.Mascotas_permitidas === 1 || propertyData.otrasCaracteristicas?.Mascotas_permitidas === true ? 'Si' : 'No',
            Tipo_inmueble: propertyData.otrasCaracteristicas?.Tipo_inmueble || '',
            Amoblado: propertyData.otrasCaracteristicas?.Amoblado === 1 || propertyData.otrasCaracteristicas?.Amoblado === true ? 'Si' : 'No',
            Descripcion_adicional: propertyData.otrasCaracteristicas?.Descripcion_adicional || '',
            asignacion: {
              Parqueaderos_asignados: (() => {
                try {
                  const parsed = JSON.parse(propertyData.otrasCaracteristicas?.asignacion?.Parqueaderos_asignados || '[]');
                  return Array.isArray(parsed) ? parsed : JSON.parse(parsed);
                } catch {
                  return [];
                }
              })(),
              Organizacion_parqueadero_FK: propertyData.otrasCaracteristicas?.asignacion?.Organizacion_parqueadero_FK || '',
              Disponible: propertyData.otrasCaracteristicas?.asignacion?.Disponible || '',
              Descripcion: propertyData.otrasCaracteristicas?.asignacion?.Descripcion || ''
            },
            organizacion_parqueadero: {
              Tipo_parqueadero: propertyData.otrasCaracteristicas?.asignacion?.organizacionParqueadero?.Tipo_parqueadero || '',
              Cantidad: propertyData.otrasCaracteristicas?.asignacion?.organizacionParqueadero?.Cantidad || '',
              Cubierto: propertyData.otrasCaracteristicas?.asignacion?.organizacionParqueadero?.Cubierto || '',
              Disponible: propertyData.otrasCaracteristicas?.asignacion?.organizacionParqueadero?.Disponible || ''
            }
          }
        });
        
        console.log('Estado property después del setProperty actualizado');
        
      } catch (error) {
        console.error('Error al cargar inmueble:', error);
        setError('Error al cargar los datos del inmueble: ' + (error.response?.data?.mensaje || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // MISMOS HANDLERS QUE CreateProperty
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
        URL: data.url,
        isNewUpload: true // Marcar como nueva imagen
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

  // HANDLE SUBMIT PARA ACTUALIZAR (NO CREAR)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...property,
        Valor: Number(property.Valor),
        Area: Number(property.Area),
        Antiguedad: Number(property.Antiguedad),
        Platform_user_FK: Number(property.Platform_user_FK),
        
        // Mismo procesamiento que CreateProperty
        direccion: {
          ...property.direccion,
          Tipo_via: property.direccion.Tipo_via || 'Calle',
          Numero_via_principal: Number(property.direccion.Numero_via_principal) || 1,
          Numero_calle_transversal: Number(property.direccion.Numero_calle_transversal) || 1,
          Numero_edificacion: Number(property.direccion.Numero_edificacion) || 1,
          Descripcion_adicional: property.direccion.Descripcion_adicional || 'Sin descripción adicional',
          
          localizacion: {
            ...property.direccion.localizacion,
            Localizacion_descripcion: property.direccion.localizacion.Localizacion_descripcion || 'Ubicación no especificada',
            Latitud: Number(property.direccion.localizacion.Latitud) || 4.6,
            Longitud: Number(property.direccion.localizacion.Longitud) || -74.0
          },
          
          ndap: property.direccion.ndap.Ndap_descripcion ? 
            {
              Ndap_descripcion: property.direccion.ndap.Ndap_descripcion,
              Activo: 1
            } : undefined,
          municipio: property.direccion.municipio.Municipio_nombre ? property.direccion.municipio : undefined,
          barrio_ciudad_corregimiento_vereda: (
            property.direccion.barrio_ciudad_corregimiento_vereda.barrio.Nombre_barrio ||
            property.direccion.barrio_ciudad_corregimiento_vereda.ciudad.Ciudad ||
            property.direccion.barrio_ciudad_corregimiento_vereda.corregimiento.Corregimiento ||
            property.direccion.barrio_ciudad_corregimiento_vereda.vereda.Vereda_nombre
          ) ? property.direccion.barrio_ciudad_corregimiento_vereda : undefined,
          designador_cardinal: property.direccion.designador_cardinal.Cardinalidad ? property.direccion.designador_cardinal : undefined
        },
        
        division: {
          ...property.division,
          Division: property.division.Division || 'Apartamento',
          Baños: Number(property.division.Baños) || 1,
          Terraza: Number(property.division.Terraza) || 0,
          Habitaciones: Number(property.division.Habitaciones) || 1,
          Garaje: Number(property.division.Garaje) || 0,
          Ascensores: property.division.Ascensores || 'No',
          Area: property.division.Area || String(property.Area),
          Balcon: property.division.Balcon || 'No',
          Closets: Number(property.division.Closets) || 1,
          Estudio: property.division.Estudio === 'Si' || property.division.Estudio === true,
          Sala: property.division.Sala === 'Si' || property.division.Sala === true || true,
          Comedor: property.division.Comedor === 'Si' || property.division.Comedor === true || true,
          Cocina: property.division.Cocina || 'Si',
          Zona_lavanderia: property.division.Zona_lavanderia === 'Si' || property.division.Zona_lavanderia === true,
          Deposito: property.division.Deposito === 'Si' || property.division.Deposito === true,
          Descripcion_adicional: property.division.Descripcion_adicional || 'Distribución estándar'
        },
        
        acerca_edificacion: {
          ...property.acerca_edificacion,
          AcercaDeLaEdificacion: property.acerca_edificacion.AcercaDeLaEdificacion || 'Edificio residencial',
          Estrato: Number(property.acerca_edificacion.Estrato) || 3,
          Tipo_construccion: property.acerca_edificacion.Tipo_construccion || 'Concreto',
          Anio_construccion: Number(property.acerca_edificacion.Anio_construccion) || 2020,
          Estado_conservacion: property.acerca_edificacion.Estado_conservacion || 'Bueno',
          Zona_comun: property.acerca_edificacion.Zona_comun === 'Si' || property.acerca_edificacion.Zona_comun === true,
          Descripcion_adicional: property.acerca_edificacion.Descripcion_adicional || 'Edificio estándar'
        },
        
        tipo_edificacion: {
          ...property.tipo_edificacion,
          Tipo_edificacion_categoria: property.tipo_edificacion.Tipo_edificacion_categoria || 'Residencial',
          Tipo_edificacion_descripcion: property.tipo_edificacion.Tipo_edificacion_descripcion || 'Apartamento',
          Tipo_edificacion_niveles: Number(property.tipo_edificacion.Tipo_edificacion_niveles) || 5
        },
        
        otras_caracteristicas: {
          ...property.otras_caracteristicas,
          Caracteristicas_descripcion: property.otras_caracteristicas.Caracteristicas_descripcion || 'Características básicas',
          Deposito: Number(property.otras_caracteristicas.Deposito) || 0,
          Lavanderia: property.otras_caracteristicas.Lavanderia === 'Si' || property.otras_caracteristicas.Lavanderia === true || true,
          Gas: property.otras_caracteristicas.Gas === 'Si' || property.otras_caracteristicas.Gas === true || true,
          Piso: Number(property.otras_caracteristicas.Piso) || 1,
          Mascotas_permitidas: property.otras_caracteristicas.Mascotas_permitidas === 'Si' || property.otras_caracteristicas.Mascotas_permitidas === true || true,
          Tipo_inmueble: property.otras_caracteristicas.Tipo_inmueble || 'Apartamento',
          Amoblado: property.otras_caracteristicas.Amoblado === 'Si' || property.otras_caracteristicas.Amoblado === true,
          Descripcion_adicional: property.otras_caracteristicas.Descripcion_adicional || 'Sin características adicionales',
          
          asignacion: {
            Parqueaderos_asignados: property.otras_caracteristicas.asignacion.Parqueaderos_asignados.length > 0 ? 
              property.otras_caracteristicas.asignacion.Parqueaderos_asignados : ['P-1'],
            Organizacion_parqueadero_FK: property.otras_caracteristicas.asignacion.Organizacion_parqueadero_FK || '',
            Disponible: property.otras_caracteristicas.asignacion.Disponible === 'Si' || property.otras_caracteristicas.asignacion.Disponible === true || true,
            Descripcion: property.otras_caracteristicas.asignacion.Descripcion || 'Parqueadero estándar'
          },
          organizacion_parqueadero: {
            Tipo_parqueadero: property.otras_caracteristicas.organizacion_parqueadero.Tipo_parqueadero || 'Cubierto',
            Cantidad: Number(property.otras_caracteristicas.organizacion_parqueadero.Cantidad) || 1,
            Cubierto: property.otras_caracteristicas.organizacion_parqueadero.Cubierto === 'Si' || property.otras_caracteristicas.organizacion_parqueadero.Cubierto === true || true,
            Disponible: property.otras_caracteristicas.organizacion_parqueadero.Disponible === 'Si' || property.otras_caracteristicas.organizacion_parqueadero.Disponible === true || true
          }
        },
        
        // Actualizar la sección de imágenes en el handleSubmit
        imagenes_inmueble: property.imagenes_inmueble.filter(img => 
          // Excluir imágenes que ya existen (que tienen un ID específico de la BD)
          !img.Imagenes_inmueble_id || img.isNewUpload
        )
      };

      console.log('Payload final a enviar para actualizar:', JSON.stringify(payload, null, 2));
      
      const response = await propertyService.updateAnidado(id, payload);
      console.log('Respuesta del servidor:', response);
      
      alert('Inmueble actualizado exitosamente!');
      navigate('/admin/inmuebles');
    } catch (error) {
      console.error('Error completo:', error);
      
      if (error.response?.data?.detalles) {
        setError(`Error: ${error.response.data.error}\n\nDetalles:\n${JSON.stringify(error.response.data.detalles, null, 2)}`);
      } else {
        setError(error.response?.data?.mensaje || error.message || 'Error al actualizar la propiedad');
      }
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-light mt-2">Cargando datos del inmueble...</p>
        </div>
      </Container>
    );
  }

  // MISMOS GRUPOS QUE CreateProperty
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
            <Form.Control 
              type="number" 
              name="Platform_user_FK" 
              value={property.Platform_user_FK} 
              onChange={handleChange} 
              required 
              placeholder="ID del usuario propietario"
            />
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
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripción NDAP</Form.Label>
            <Form.Control 
              type="text" 
              name="Ndap_descripcion" 
              value={property.direccion.ndap.Ndap_descripcion} 
              onChange={handleNdapChange} 
              placeholder="Ej: Nivel de Acceso Básico"
            />
          </Form.Group>
        </>
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
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Division</Form.Label>
            <Form.Control type="text" name="Division" value={property.division.Division} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Balcon</Form.Label>
            <Form.Control type="text" name="Balcon" value={property.division.Balcon} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Baños</Form.Label>
            <Form.Control type="number" name="Baños" value={property.division.Baños} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Terraza</Form.Label>
            <Form.Control type="number" name="Terraza" value={property.division.Terraza} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Habitaciones</Form.Label>
            <Form.Control type="number" name="Habitaciones" value={property.division.Habitaciones} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Garaje</Form.Label>
            <Form.Control type="number" name="Garaje" value={property.division.Garaje} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Ascensores</Form.Label>
            <Form.Control type="text" name="Ascensores" value={property.division.Ascensores} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Area</Form.Label>
            <Form.Control type="text" name="Area" value={property.division.Area} onChange={handleDivisionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Closets</Form.Label>
            <Form.Control type="number" name="Closets" value={property.division.Closets} onChange={handleDivisionChange} />
          </Form.Group>
          
          {/* CAMPOS BOOLEANOS CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Estudio</Form.Label>
            <Form.Select name="Estudio" value={property.division.Estudio} onChange={handleDivisionChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Sala</Form.Label>
            <Form.Select name="Sala" value={property.division.Sala} onChange={handleDivisionChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Comedor</Form.Label>
            <Form.Select name="Comedor" value={property.division.Comedor} onChange={handleDivisionChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Cocina</Form.Label>
            <Form.Control type="text" name="Cocina" value={property.division.Cocina} onChange={handleDivisionChange} />
          </Form.Group>
          
          {/* CAMPOS BOOLEANOS CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Zona_lavanderia</Form.Label>
            <Form.Select name="Zona_lavanderia" value={property.division.Zona_lavanderia} onChange={handleDivisionChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Deposito</Form.Label>
            <Form.Select name="Deposito" value={property.division.Deposito} onChange={handleDivisionChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripcion_adicional</Form.Label>
            <Form.Control type="text" name="Descripcion_adicional" value={property.division.Descripcion_adicional} onChange={handleDivisionChange} />
          </Form.Group>
        </>
      )
    },
    
    {
      titulo: 'Acerca de la Edificación',
      contenido: (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">AcercaDeLaEdificacion</Form.Label>
            <Form.Control type="text" name="AcercaDeLaEdificacion" value={property.acerca_edificacion.AcercaDeLaEdificacion} onChange={handleAcercaChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Estrato</Form.Label>
            <Form.Control type="number" name="Estrato" value={property.acerca_edificacion.Estrato} onChange={handleAcercaChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Tipo_construccion</Form.Label>
            <Form.Control type="text" name="Tipo_construccion" value={property.acerca_edificacion.Tipo_construccion} onChange={handleAcercaChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Anio_construccion</Form.Label>
            <Form.Control type="number" name="Anio_construccion" value={property.acerca_edificacion.Anio_construccion} onChange={handleAcercaChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Estado_conservacion</Form.Label>
            <Form.Control type="text" name="Estado_conservacion" value={property.acerca_edificacion.Estado_conservacion} onChange={handleAcercaChange} />
          </Form.Group>
          
          {/* CAMPO BOOLEANO CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Zona_comun</Form.Label>
            <Form.Select name="Zona_comun" value={property.acerca_edificacion.Zona_comun} onChange={handleAcercaChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripcion_adicional</Form.Label>
            <Form.Control type="text" name="Descripcion_adicional" value={property.acerca_edificacion.Descripcion_adicional} onChange={handleAcercaChange} />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Caracteristicas_descripcion</Form.Label>
            <Form.Control type="text" name="Caracteristicas_descripcion" value={property.otras_caracteristicas.Caracteristicas_descripcion} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Deposito</Form.Label>
            <Form.Control type="number" name="Deposito" value={property.otras_caracteristicas.Deposito} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
          
          {/* CAMPOS BOOLEANOS CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Lavanderia</Form.Label>
            <Form.Select name="Lavanderia" value={property.otras_caracteristicas.Lavanderia} onChange={handleOtrasCaracteristicasChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Gas</Form.Label>
            <Form.Select name="Gas" value={property.otras_caracteristicas.Gas} onChange={handleOtrasCaracteristicasChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Piso</Form.Label>
            <Form.Control type="number" name="Piso" value={property.otras_caracteristicas.Piso} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
          
          {/* CAMPOS BOOLEANOS CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Mascotas_permitidas</Form.Label>
            <Form.Select name="Mascotas_permitidas" value={property.otras_caracteristicas.Mascotas_permitidas} onChange={handleOtrasCaracteristicasChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Tipo_inmueble</Form.Label>
            <Form.Control type="text" name="Tipo_inmueble" value={property.otras_caracteristicas.Tipo_inmueble} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
          
          {/* CAMPO BOOLEANO CON DROPDOWN */}
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Amoblado</Form.Label>
            <Form.Select name="Amoblado" value={property.otras_caracteristicas.Amoblado} onChange={handleOtrasCaracteristicasChange}>
              <option value="">Seleccionar...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="card-label">Descripcion_adicional</Form.Label>
            <Form.Control type="text" name="Descripcion_adicional" value={property.otras_caracteristicas.Descripcion_adicional} onChange={handleOtrasCaracteristicasChange} />
          </Form.Group>
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
      <h2 className='admin-dashboard-titulo text-center mb-4'>Editar Inmueble (ID: {id})</h2>
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
          <Button 
            variant="secondary" 
            className="me-3"
            onClick={() => navigate('/admin/inmuebles')}
          >
            Cancelar
          </Button>
          <Button className="btn-editar-propiedad" type="submit">
            Actualizar Inmueble
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
  .btn-editar-propiedad {
    background: #72A3D1FF;
    color: #15365FFF;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 16px 48px;
    box-shadow: 0 2px 8px rgba(60, 90, 130, 0.15);
    transition: background 0.2s, color 0.2s;
  }
  .btn-editar-propiedad:hover, .btn-editar-propiedad:focus {
    background: #1C56A7FF;
    color: #FDFDFDFF;
  }
`}</style>
    </Container>
  );
};

export default EditProperty;