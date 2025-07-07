import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyDescription = ({ descripcion }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <h3 className="mb-3">Descripción</h3>
                <p className="text-justify">{descripcion}</p>
            </Card.Body>
        </Card>
    );
};

export default PropertyDescription;