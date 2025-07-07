import React, { useState } from 'react';
import { Container, Accordion, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const PreguntasFrecuentes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const faqs = [
        {
            pregunta: "¿Cómo puedo publicar una propiedad?",
            respuesta: "Para publicar una propiedad, debe registrarse como usuario y seleccionar la opción 'Publicar Propiedad' en su panel de control."
        },
        {
            pregunta: "¿Cuál es el costo del servicio?",
            respuesta: "Los costos varían según el tipo de publicación y los servicios adicionales seleccionados. Consulte nuestra página de precios para más detalles."
        },
        {
            pregunta: "¿Cómo contacto a un vendedor?",
            respuesta: "Puede contactar al vendedor a través del formulario de contacto disponible en cada anuncio de propiedad."
        },
        {
            pregunta: "¿Cómo verifican las propiedades?",
            respuesta: "Nuestro equipo verifica la documentación y realiza comprobaciones básicas de cada propiedad antes de su publicación."
        },
        {
            pregunta: "¿Puedo programar una visita?",
            respuesta: "Sí, puede solicitar una visita a través del botón 'Programar Visita' en la página de cada propiedad."
        }
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.respuesta.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Preguntas Frecuentes</h1>
            
            <InputGroup className="mb-4">
                <InputGroup.Text>
                    <FaSearch />
                </InputGroup.Text>
                <Form.Control
                    placeholder="Buscar preguntas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            <Accordion>
                {filteredFaqs.map((faq, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{faq.pregunta}</Accordion.Header>
                        <Accordion.Body>{faq.respuesta}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default PreguntasFrecuentes;