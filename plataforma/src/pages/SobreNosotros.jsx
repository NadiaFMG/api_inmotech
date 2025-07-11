// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
// import { porqueElegirnosService } from '../services/api';

// const SobreNosotros = () => {
//     const [cards, setCards] = useState([]);

//     useEffect(() => {
//         const fetchCards = async () => {
//             const res = await porqueElegirnosService.getAll();
//             // Solo activos, ordenados y máximo 20
//             const activosOrdenados = res.data
//                 .filter(item => item.activo)
//                 .sort((a, b) => Number(a.orden) - Number(b.orden))
//                 .slice(0, 20);
//             setCards(activosOrdenados);
//         };
//         fetchCards();
//     }, []);

//     // Renderiza el icono guardado
//     const renderIcon = (iconName) => {
//         const IconComp = FaIcons[iconName];
//         return IconComp ? <IconComp className="text-primary mb-3 fs-1" /> : null;
//     };

//     return (
//         <Container className="py-4">
//             <h1 className="text-center mb-4">Sobre Nosotros</h1>
            
//             <Row className="mb-4">
//                 <Col lg={6}>
//                     <div className="mb-4">
//                         <h2>Nuestra Historia</h2>
//                         <p>InmoTech nació con la visión de revolucionar el mercado inmobiliario, combinando la experiencia en bienes raíces con la tecnología más avanzada para ofrecer un servicio excepcional.</p>
//                     </div>
//                     <div>
//                         <h2>Nuestra Misión</h2>
//                         <p>Facilitar el proceso de búsqueda y gestión de propiedades, brindando una plataforma intuitiva y segura que conecte a propietarios con potenciales compradores o inquilinos.</p>
//                     </div>
//                 </Col>
//                 <Col lg={6}>
//                     <img 
//                         src="/images/about-us.jpg" 
//                         alt="Equipo InmoTech" 
//                         className="img-fluid rounded shadow"
//                     />
//                 </Col>
//             </Row>

//             <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
//             <Row>
//                 {cards.map((item, index) => (
//                     <Col md={3} key={index} className="mb-4">
//                         <Card className="h-100 text-center">
//                             <Card.Body>
//                                 {renderIcon(item.icono)}
//                                 <h4>{item.titulo}</h4>
//                                 <p className="mb-0">{item.descripcion}</p>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default SobreNosotros;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import { sobreNosotrosService, porqueElegirnosService } from '../services/api';

const SobreNosotros = () => {
    const [infos, setInfos] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await sobreNosotrosService.getAll();
            // Todos los registros activos
            const activos = res.data.filter(item => item.activo);
            setInfos(activos);
        };
        fetchInfo();
    }, []);

    useEffect(() => {
        const fetchCards = async () => {
            const res = await porqueElegirnosService.getAll();
            // Solo activos, ordenados y máximo 20
            const activosOrdenados = res.data
                .filter(item => item.activo)
                .sort((a, b) => Number(a.orden) - Number(b.orden))
                .slice(0, 20);
            setCards(activosOrdenados);
        };
        fetchCards();
    }, []);

    // Renderiza el icono guardado
    const renderIcon = (iconName) => {
        const IconComp = FaIcons[iconName];
        return IconComp ? <IconComp className="text-primary mb-3 fs-1" /> : null;
    };

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Sobre Nosotros</h1>
            {infos.map((info, idx) => (
                <Row className="mb-4" key={idx}>
                    <Col lg={6}>
                        <div className="mb-4">
                            <h2>{info.titulo}</h2>
                            <p>{info.descripcion}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        {info.imagen_url && (
                            <img 
                                src={info.imagen_url.startsWith('http') ? info.imagen_url : `http://localhost:3000${info.imagen_url}`}
                                alt={info.titulo}
                                className="img-fluid rounded shadow"
                            />
                        )}
                    </Col>
                </Row>
            ))}

            <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
            <Row>
                {cards.map((item, index) => (
                    <Col md={3} key={index} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                {renderIcon(item.icono)}
                                <h4>{item.titulo}</h4>
                                <p className="mb-0">{item.descripcion}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SobreNosotros;