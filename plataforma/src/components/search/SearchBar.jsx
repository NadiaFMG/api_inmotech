// // // import React, { useState } from 'react';
// // // import { Container, Form, Row, Col, Button } from 'react-bootstrap';

// // // const SearchBar = ({ onSearch }) => {
// // //     const [searchParams, setSearchParams] = useState({
// // //         ubicacion: '',
// // //         tipoPropiedad: '',
// // //         tipoOperacion: '',
// // //         precioMin: '',
// // //         precioMax: ''
// // //     });

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setSearchParams(prev => ({
// // //             ...prev,
// // //             [name]: value
// // //         }));
// // //     };

// // //     const handleSubmit = (e) => {
// // //         e.preventDefault();
// // //         onSearch(searchParams);
// // //     };

// // //     return (
// // //         <Container className="search-container my-4">
// // //             <Form onSubmit={handleSubmit}>
// // //                 <Row className="g-3">
// // //                     <Col md={2}>
// // //                         <Form.Select
// // //                             name="tipoOperacion"
// // //                             value={searchParams.tipoOperacion}
// // //                             onChange={handleChange}
// // //                         >
// // //                             <option value="">Tipo de Operación</option>
// // //                             <option value="venta">Venta</option>
// // //                             <option value="arriendo">Arriendo</option>
// // //                             <option value="arriendo_temporal">Arriendo Temporal</option>
// // //                         </Form.Select>
// // //                     </Col>
// // //                     <Col md={2}>
// // //                         <Form.Control
// // //                             type="text"
// // //                             placeholder="Ubicación"
// // //                             name="ubicacion"
// // //                             value={searchParams.ubicacion}
// // //                             onChange={handleChange}
// // //                         />
// // //                     </Col>
// // //                     <Col md={2}>
// // //                         <Form.Select
// // //                             name="tipoPropiedad"
// // //                             value={searchParams.tipoPropiedad}
// // //                             onChange={handleChange}
// // //                         >
// // //                             <option value="">Tipo de Propiedad</option>
// // //                             <option value="casa">Casa</option>
// // //                             <option value="apartamento">Apartamento</option>
// // //                             <option value="local">Local Comercial</option>
// // //                             <option value="terreno">Terreno</option>
// // //                         </Form.Select>
// // //                     </Col>
// // //                     <Col md={2}>
// // //                         <Form.Control
// // //                             type="number"
// // //                             placeholder="Precio Mínimo"
// // //                             name="precioMin"
// // //                             value={searchParams.precioMin}
// // //                             onChange={handleChange}
// // //                         />
// // //                     </Col>
// // //                     <Col md={2}>
// // //                         <Form.Control
// // //                             type="number"
// // //                             placeholder="Precio Máximo"
// // //                             name="precioMax"
// // //                             value={searchParams.precioMax}
// // //                             onChange={handleChange}
// // //                         />
// // //                     </Col>
// // //                     <Col md={2}>
// // //                         <Button type="submit" variant="primary" className="w-100">
// // //                             Buscar
// // //                         </Button>
// // //                     </Col>
// // //                 </Row>
// // //             </Form>
// // //         </Container>
// // //     );
// // // };

// // // export default SearchBar;

// // import React, { useState } from 'react';
// // import { Container, Form, Row, Col, Button } from 'react-bootstrap';

// // const SearchBar = ({ onSearch }) => {
// //     // Usamos los campos más esenciales según tu modelo de inmueble
// //     const [searchParams, setSearchParams] = useState({
// //         ValorMin: '',
// //         ValorMax: '',
// //         Direccion: '',
// //         Motivo_VoA: '',
// //         Estado: ''
// //     });

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setSearchParams(prev => ({
// //             ...prev,
// //             [name]: value
// //         }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         // Solo enviamos los campos con valor
// //         const cleanParams = Object.fromEntries(
// //             Object.entries(searchParams).filter(
// //                 ([_, v]) => v !== '' && v !== null && v !== undefined
// //             )
// //         );
// //         onSearch(cleanParams);
// //     };

// //     return (
// //         <Container className="search-container my-4">
// //             <Form onSubmit={handleSubmit}>
// //                 <Row className="g-3">
// //                     <Col md={2}>
// //                         <Form.Control
// //                             type="number"
// //                             placeholder="Precio Mínimo"
// //                             name="ValorMin"
// //                             value={searchParams.ValorMin}
// //                             onChange={handleChange}
// //                         />
// //                     </Col>
// //                     <Col md={2}>
// //                         <Form.Control
// //                             type="number"
// //                             placeholder="Precio Máximo"
// //                             name="ValorMax"
// //                             value={searchParams.ValorMax}
// //                             onChange={handleChange}
// //                         />
// //                     </Col>
// //                     <Col md={3}>
// //                         <Form.Control
// //                             type="text"
// //                             placeholder="Ubicación"
// //                             name="Direccion"
// //                             value={searchParams.Direccion}
// //                             onChange={handleChange}
// //                         />
// //                     </Col>
// //                     <Col md={2}>
// //                         <Form.Select
// //                             name="Motivo_VoA"
// //                             value={searchParams.Motivo_VoA}
// //                             onChange={handleChange}
// //                         >
// //                             <option value="">Motivo</option>
// //                             <option value="venta">Venta</option>
// //                             <option value="arriendo">Arriendo</option>
// //                         </Form.Select>
// //                     </Col>
// //                     <Col md={2}>
// //                         <Form.Select
// //                             name="Estado"
// //                             value={searchParams.Estado}
// //                             onChange={handleChange}
// //                         >
// //                             <option value="">Estado</option>
// //                             <option value="disponible">Disponible</option>
// //                             <option value="en construcion">En construcción</option>
// //                             <option value="vendido">Vendido</option>
// //                         </Form.Select>
// //                     </Col>
// //                     <Col md={1}>
// //                         <Button type="submit" variant="primary" className="w-100">
// //                             Buscar
// //                         </Button>
// //                     </Col>
// //                 </Row>
// //             </Form>
// //         </Container>
// //     );
// // };

// // export default SearchBar;

// import React, { useState } from 'react';
// import { Container, Form, Row, Col, Button } from 'react-bootstrap';

// const SearchBar = ({ onSearch }) => {
//     // Campos esenciales según tu modelo de inmueble
//     const [searchParams, setSearchParams] = useState({
//         ValorMin: '',
//         ValorMax: '',
//         Direccion: '',
//         Motivo_VoA: '',
//         Estado: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchParams(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     // Solo enviamos los campos con valor
//     //     const cleanParams = Object.fromEntries(
//     //         Object.entries(searchParams).filter(
//     //             ([_, v]) => v !== '' && v !== null && v !== undefined
//     //         )
//     //     );
//     //     onSearch(cleanParams);
//     // };

//     const handleSubmit = (e) => {
//     e.preventDefault();
//     // Solo enviamos los campos con valor
//     const cleanParams = Object.fromEntries(
//         Object.entries(searchParams).filter(
//             ([_, v]) => v !== '' && v !== null && v !== undefined
//         )
//     );

//     // Transforma los nombres para el backend
//     const paramsForBackend = { ...cleanParams };
//     if (cleanParams.ValorMin) {
//         paramsForBackend.Valor_gte = cleanParams.ValorMin; // o el nombre que espera tu backend
//         delete paramsForBackend.ValorMin;
//     }
//     if (cleanParams.ValorMax) {
//         paramsForBackend.Valor_lte = cleanParams.ValorMax; // o el nombre que espera tu backend
//         delete paramsForBackend.ValorMax;
//     }

//     onSearch(paramsForBackend);
// };

//     return (
//         <Container className="search-container my-4">
//             <Form onSubmit={handleSubmit}>
//                 <Row className="g-3">
//                     <Col md={2}>
//                         <Form.Control
//                             type="number"
//                             placeholder="Precio Mínimo"
//                             name="ValorMin"
//                             value={searchParams.ValorMin}
//                             onChange={handleChange}
//                         />
//                     </Col>
//                     <Col md={2}>
//                         <Form.Control
//                             type="number"
//                             placeholder="Precio Máximo"
//                             name="ValorMax"
//                             value={searchParams.ValorMax}
//                             onChange={handleChange}
//                         />
//                     </Col>
//                     <Col md={3}>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ubicación"
//                             name="Direccion"
//                             value={searchParams.Direccion}
//                             onChange={handleChange}
//                         />
//                     </Col>
//                     <Col md={2}>
//                         <Form.Select
//                             name="Motivo_VoA"
//                             value={searchParams.Motivo_VoA}
//                             onChange={handleChange}
//                         >
//                             <option value="">Motivo</option>
//                             <option value="venta">Venta</option>
//                             <option value="arriendo">Arriendo</option>
//                         </Form.Select>
//                     </Col>
//                     <Col md={2}>
//                         <Form.Select
//                             name="Estado"
//                             value={searchParams.Estado}
//                             onChange={handleChange}
//                         >
//                             <option value="">Estado</option>
//                             <option value="disponible">Disponible</option>
//                             <option value="en construcion">En construcción</option>
//                             <option value="vendido">Vendido</option>
//                         </Form.Select>
//                     </Col>
//                     <Col md={1}>
//                         <Button type="submit" variant="primary" className="w-100">
//                             Buscar
//                         </Button>
//                     </Col>
//                 </Row>
//             </Form>
//         </Container>
//     );
// };

// export default SearchBar;

import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    // Campos esenciales según tu modelo de inmueble
    const [searchParams, setSearchParams] = useState({
        ValorMin: '',
        ValorMax: '',
        Direccion: '',
        motivo_transaccion: '',
        estado_inmueble: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Solo enviamos los campos con valor
        const cleanParams = Object.fromEntries(
            Object.entries(searchParams).filter(
                ([_, v]) => v !== '' && v !== null && v !== undefined
            )
        );

        // Transforma los nombres para el backend
        const paramsForBackend = { ...cleanParams };
        if (cleanParams.ValorMin) {
            paramsForBackend.min_precio = cleanParams.ValorMin;
            delete paramsForBackend.ValorMin;
        }
        if (cleanParams.ValorMax) {
            paramsForBackend.max_precio = cleanParams.ValorMax;
            delete paramsForBackend.ValorMax;
        }

        onSearch(paramsForBackend);
    };

    return (
        <Container className="search-container my-4">
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Precio Mínimo"
                            name="ValorMin"
                            value={searchParams.ValorMin}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Precio Máximo"
                            name="ValorMax"
                            value={searchParams.ValorMax}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Control
                            type="text"
                            placeholder="Ubicación"
                            name="Direccion"
                            value={searchParams.Direccion}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            name="motivo_transaccion"
                            value={searchParams.motivo_transaccion}
                            onChange={handleChange}
                        >
                            <option value="">Motivo</option>
                            <option value="venta">Venta</option>
                            <option value="arriendo">Arriendo</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            name="estado_inmueble"
                            value={searchParams.estado_inmueble}
                            onChange={handleChange}
                        >
                            <option value="">Estado</option>
                            <option value="disponible">Disponible</option>
                            <option value="en construcion">En construcción</option>
                            <option value="vendido">Vendido</option>
                        </Form.Select>
                    </Col>
                    <Col md={1}>
                        <Button type="submit" variant="primary" className="w-100">
                            Buscar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default SearchBar;