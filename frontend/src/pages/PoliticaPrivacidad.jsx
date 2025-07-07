import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PoliticaPrivacidad = () => {
    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Política de Privacidad</h1>
            
            <Card className="mb-4">
                <Card.Body>
                    <h2>1. Recopilación de Información</h2>
                    <p>Recopilamos información personal cuando usted se registra, publica propiedades o contacta a otros usuarios.</p>
                    
                    <h2>2. Uso de la Información</h2>
                    <p>La información recopilada se utiliza para mejorar nuestros servicios y personalizar su experiencia.</p>
                    
                    <h2>3. Protección de Datos</h2>
                    <p>Implementamos medidas de seguridad para proteger su información personal.</p>
                    
                    <h2>4. Compartir Información</h2>
                    <p>No vendemos ni compartimos su información personal con terceros sin su consentimiento.</p>
                    
                    <h2>5. Cookies</h2>
                    <p>Utilizamos cookies para mejorar la experiencia del usuario y analizar el tráfico del sitio.</p>
                    
                    <h2>6. Derechos del Usuario</h2>
                    <p>Tiene derecho a acceder, corregir o eliminar su información personal.</p>
                    
                    <h2>7. Contacto</h2>
                    <p>Para cualquier consulta sobre privacidad, contáctenos a través de nuestro formulario.</p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PoliticaPrivacidad;