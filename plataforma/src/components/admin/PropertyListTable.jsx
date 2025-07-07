import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PropertyListTable = ({ properties, onEdit, onDelete }) => {
    return (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {properties.map((property) => (
                    <tr key={property.id}>
                        <td>{property.id}</td>
                        <td>{property.titulo}</td>
                        <td>{property.ubicacion}</td>
                        <td>
                            <Badge bg={property.estado === "Publicado" ? "success" : "warning"}>
                                {property.estado}
                            </Badge>
                        </td>
                        <td>{property.fechaPublicacion}</td>
                        <td>
                            <Button 
                                variant="outline-primary" 
                                size="sm" 
                                className="me-2"
                                onClick={() => onEdit(property.id)}
                            >
                                <FaEdit /> Editar
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => onDelete(property.id)}
                            >
                                <FaTrash /> Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default PropertyListTable;