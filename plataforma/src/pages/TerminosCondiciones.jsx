import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TerminosCondiciones = () => {
    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Términos y Condiciones</h1>
            
            <Card className="mb-4">
                <Card.Body>
                    <h2>1. Aceptación de los Términos</h2>
                    <p>Al acceder y utilizar esta plataforma, usted acepta estos términos y condiciones en su totalidad.</p>
                    
                    <h2>2. Uso del Servicio</h2>
                    <p>La plataforma está destinada a facilitar la búsqueda y publicación de propiedades inmobiliarias.</p>
                    
                    <h2>3. Registro y Cuentas</h2>
                    <p>Los usuarios son responsables de mantener la confidencialidad de sus cuentas y contraseñas.</p>
                    
                    <h2>4. Publicación de Propiedades</h2>
                    <p>Toda la información publicada debe ser precisa y verdadera.</p>
                    
                    <h2>5. Responsabilidades</h2>
                    <p>La plataforma actúa como intermediario y no se hace responsable de las transacciones entre usuarios.</p>
                    
                    <h2>6. Propiedad Intelectual</h2>
                    <p>Todo el contenido de la plataforma está protegido por derechos de autor.</p>
                    
                    <h2>7. Modificaciones</h2>
                    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TerminosCondiciones;