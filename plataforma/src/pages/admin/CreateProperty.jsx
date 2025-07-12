// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { 
//     inmuebleService,
//     tipoEdificacionService,
//     acercaEdificacionService,
//     divisionService,
//     imagenesInmuebleService,
//     otrasCaracteristicasService,
//     direccionService,
//     asignacionService,
//     organizacionParqueaderoService,
//     barrioService,
//     barrioCiudadCorregimientoVeredaService,
//     ciudadService,
//     corregimientoService,
//     veredaService,
//     municipioService,
//     ndapService,
//     localizacionService,
//     designadorCardinalService
//  } from '../../services/propertyService';

// const CreateProperty = () => {
//     const navigate = useNavigate();
//     const [error, setError] = useState('');
//     const [inputs, setInputs] = useState({
//         Valor: '',
//         Area: '',
//         Descripcion_General: '',
//         Antiguedad: '',
//         Motivo_VoA: '',
//         Situacion_inmueble: '',
//         Tipo_edificacion_FK: '',
//         Otras_caracteristicas_FK: '',
//         Acerca_edificacion_FK: '',
//         Division_FK: '',
//         Imagenes_inmueble_FK: '',
//         Codigo_interno: '',
//         Estado: 'disponible',
//         Fecha_publicacion: '',
//         Fecha_actualizacion: '',
//         Visitas: 0,
//         Observaciones: '',
//         Platform_user_FK: '',
//         Direccion_FK: ''
//     });

//     // Opciones para selects
//     const [tiposEdificacion, setTiposEdificacion] = useState([]);
//     const [otrasCaracteristicas, setOtrasCaracteristicas] = useState([]);
//     const [acercaEdificacion, setAcercaEdificacion] = useState([]);
//     const [divisiones, setDivisiones] = useState([]);
//     const [imagenesInmueble, setImagenesInmueble] = useState([]);
//     const [direcciones, setDirecciones] = useState([]);
//     const [usuarios, setUsuarios] = useState([]);

//     useEffect(() => {
//         tipoEdificacionService.getAll().then(res => setTiposEdificacion(res.data));
//         otrasCaracteristicasService.getAll().then(res => setOtrasCaracteristicas(res.data));
//         acercaEdificacionService.getAll().then(res => setAcercaEdificacion(res.data));
//         divisionService.getAll().then(res => setDivisiones(res.data));
//         imagenesInmuebleService.getAll().then(res => setImagenesInmueble(res.data));
//         direccionService.getAll().then(res => setDirecciones(res.data));
//         asignacionService.getAll().then(res => setUsuarios(res.data));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputs(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await inmuebleService.create(inputs);
//             navigate('/admin/inmuebles', { state: { refresh: true } });
//         } catch (error) {
//             setError(error.response?.data?.mensaje || 'Error al crear el inmueble');
//         }
//     };

//     return (
//         <Container className="mt-4">
//             <h2>Crear Nuevo Inmueble</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Valor</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="Valor"
//                                 value={inputs.Valor}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Área</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="Area"
//                                 value={inputs.Area}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Descripción General</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 name="Descripcion_General"
//                                 value={inputs.Descripcion_General}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Antigüedad</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="Antiguedad"
//                                 value={inputs.Antiguedad}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Motivo VoA</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="Motivo_VoA"
//                                 value={inputs.Motivo_VoA}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Situación Inmueble</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="Situacion_inmueble"
//                                 value={inputs.Situacion_inmueble}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Tipo de Edificación</Form.Label>
//                             <Form.Select
//                                 name="Tipo_edificacion_FK"
//                                 value={inputs.Tipo_edificacion_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {tiposEdificacion.map(opt => (
//                                     <option key={opt.Tipo_edificacion_id} value={opt.Tipo_edificacion_id}>
//                                         {opt.Tipo_edificacion_descripcion}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Otras Características</Form.Label>
//                             <Form.Select
//                                 name="Otras_caracteristicas_FK"
//                                 value={inputs.Otras_caracteristicas_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {otrasCaracteristicas.map(opt => (
//                                     <option key={opt.Otras_caracteristicas_id} value={opt.Otras_caracteristicas_id}>
//                                         {opt.Descripcion}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Acerca de la Edificación</Form.Label>
//                             <Form.Select
//                                 name="Acerca_edificacion_FK"
//                                 value={inputs.Acerca_edificacion_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {acercaEdificacion.map(opt => (
//                                     <option key={opt.Acerca_edificacion_id} value={opt.Acerca_edificacion_id}>
//                                         {opt.AcercaDeLaEdificacion}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>División</Form.Label>
//                             <Form.Select
//                                 name="Division_FK"
//                                 value={inputs.Division_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {divisiones.map(opt => (
//                                     <option key={opt.Division_id} value={opt.Division_id}>
//                                         {opt.Descripcion}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Imágenes Inmueble</Form.Label>
//                             <Form.Select
//                                 name="Imagenes_inmueble_FK"
//                                 value={inputs.Imagenes_inmueble_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {imagenesInmueble.map(opt => (
//                                     <option key={opt.Imagenes_inmueble_id} value={opt.Imagenes_inmueble_id}>
//                                         {opt.Nombre}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Código Interno</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="Codigo_interno"
//                                 value={inputs.Codigo_interno}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Estado</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="Estado"
//                                 value={inputs.Estado}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Fecha Publicación</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="Fecha_publicacion"
//                                 value={inputs.Fecha_publicacion}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Fecha Actualización</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="Fecha_actualizacion"
//                                 value={inputs.Fecha_actualizacion}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Visitas</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="Visitas"
//                                 value={inputs.Visitas}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Observaciones</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="Observaciones"
//                                 value={inputs.Observaciones}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Usuario (Publicador)</Form.Label>
//                             <Form.Select
//                                 name="Platform_user_FK"
//                                 value={inputs.Platform_user_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {usuarios.map(opt => (
//                                     <option key={opt.Platform_user_id} value={opt.Platform_user_id}>
//                                         {opt.Nombre}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Dirección</Form.Label>
//                             <Form.Select
//                                 name="Direccion_FK"
//                                 value={inputs.Direccion_FK}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Seleccione...</option>
//                                 {direcciones.map(opt => (
//                                     <option key={opt.Direccion_id} value={opt.Direccion_id}>
//                                         {opt.DireccionCompleta || opt.Direccion_id}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Button variant="primary" type="submit">
//                     Crear Inmueble
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default CreateProperty;

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    inmuebleService,
    tipoEdificacionService,
    acercaEdificacionService,
    divisionService,
    imagenesInmuebleService,
    otrasCaracteristicasService,
    direccionService,
    asignacionService
} from '../../services/propertyService';

const CreateProperty = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        Valor: '',
        Area: '',
        Descripcion_General: '',
        Antiguedad: '',
        Motivo_VoA: '',
        Situacion_inmueble: '',
        Tipo_edificacion_FK: '',
        Otras_caracteristicas_FK: '',
        Acerca_edificacion_FK: '',
        Division_FK: '',
        Imagenes_inmueble_FK: '',
        Codigo_interno: '',
        Estado: 'disponible',
        Fecha_publicacion: '',
        Fecha_actualizacion: '',
        Visitas: 0,
        Observaciones: '',
        Platform_user_FK: '',
        Direccion_FK: ''
    });

    // Opciones para selects
    const [tiposEdificacion, setTiposEdificacion] = useState([]);
    const [otrasCaracteristicas, setOtrasCaracteristicas] = useState([]);
    const [acercaEdificacion, setAcercaEdificacion] = useState([]);
    const [divisiones, setDivisiones] = useState([]);
    const [imagenesInmueble, setImagenesInmueble] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        tipoEdificacionService.getAll().then(res => setTiposEdificacion(res.data));
        otrasCaracteristicasService.getAll().then(res => setOtrasCaracteristicas(res.data));
        acercaEdificacionService.getAll().then(res => setAcercaEdificacion(res.data));
        divisionService.getAll().then(res => setDivisiones(res.data));
        imagenesInmuebleService.getAll().then(res => setImagenesInmueble(res.data));
        direccionService.getAll().then(res => setDirecciones(res.data));
        asignacionService.getAll().then(res => setUsuarios(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await inmuebleService.create(inputs);
            navigate('/admin/inmuebles', { state: { refresh: true } });
        } catch (error) {
            setError(error.response?.data?.mensaje || 'Error al crear el inmueble');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Crear Nuevo Inmueble</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number"
                                name="Valor"
                                value={inputs.Valor}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Área</Form.Label>
                            <Form.Control
                                type="number"
                                name="Area"
                                value={inputs.Area}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción General</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Descripcion_General"
                                value={inputs.Descripcion_General}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Antigüedad</Form.Label>
                            <Form.Control
                                type="number"
                                name="Antiguedad"
                                value={inputs.Antiguedad}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Motivo VoA</Form.Label>
                            <Form.Control
                                type="text"
                                name="Motivo_VoA"
                                value={inputs.Motivo_VoA}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Situación Inmueble</Form.Label>
                            <Form.Control
                                type="text"
                                name="Situacion_inmueble"
                                value={inputs.Situacion_inmueble}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Edificación</Form.Label>
                            <Form.Select
                                name="Tipo_edificacion_FK"
                                value={inputs.Tipo_edificacion_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {tiposEdificacion.map(opt => (
                                    <option key={opt.Tipo_edificacion_id} value={opt.Tipo_edificacion_id}>
                                        {opt.Tipo_edificacion_descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Otras Características</Form.Label>
                            <Form.Select
                                name="Otras_caracteristicas_FK"
                                value={inputs.Otras_caracteristicas_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {otrasCaracteristicas.map(opt => (
                                    <option key={opt.Otras_caracteristicas_id} value={opt.Otras_caracteristicas_id}>
                                        {opt.Descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Acerca de la Edificación</Form.Label>
                            <Form.Select
                                name="Acerca_edificacion_FK"
                                value={inputs.Acerca_edificacion_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {acercaEdificacion.map(opt => (
                                    <option key={opt.Acerca_edificacion_id} value={opt.Acerca_edificacion_id}>
                                        {opt.AcercaDeLaEdificacion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>División</Form.Label>
                            <Form.Select
                                name="Division_FK"
                                value={inputs.Division_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {divisiones.map(opt => (
                                    <option key={opt.Division_id} value={opt.Division_id}>
                                        {opt.Descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Imágenes Inmueble</Form.Label>
                            <Form.Select
                                name="Imagenes_inmueble_FK"
                                value={inputs.Imagenes_inmueble_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {imagenesInmueble.map(opt => (
                                    <option key={opt.Imagenes_inmueble_id} value={opt.Imagenes_inmueble_id}>
                                        {opt.Nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Código Interno</Form.Label>
                            <Form.Control
                                type="text"
                                name="Codigo_interno"
                                value={inputs.Codigo_interno}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                name="Estado"
                                value={inputs.Estado}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha Publicación</Form.Label>
                            <Form.Control
                                type="date"
                                name="Fecha_publicacion"
                                value={inputs.Fecha_publicacion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha Actualización</Form.Label>
                            <Form.Control
                                type="date"
                                name="Fecha_actualizacion"
                                value={inputs.Fecha_actualizacion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Visitas</Form.Label>
                            <Form.Control
                                type="number"
                                name="Visitas"
                                value={inputs.Visitas}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control
                                type="text"
                                name="Observaciones"
                                value={inputs.Observaciones}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario (Publicador)</Form.Label>
                            <Form.Select
                                name="Platform_user_FK"
                                value={inputs.Platform_user_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {usuarios.map(opt => (
                                    <option key={opt.Platform_user_id} value={opt.Platform_user_id}>
                                        {opt.Nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Select
                                name="Direccion_FK"
                                value={inputs.Direccion_FK}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {direcciones.map(opt => (
                                    <option key={opt.Direccion_id} value={opt.Direccion_id}>
                                        {opt.DireccionCompleta || opt.Direccion_id}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Crear Inmueble
                </Button>
            </Form>
        </Container>
    );
};

export default CreateProperty;