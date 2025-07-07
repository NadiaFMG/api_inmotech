import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecentPropertiesList = () => {
    return (
        <div className="mt-4">
            <h4 className="mb-3">Propiedades Recientes</h4>
            <Table responsive striped hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        {
                            id: 1,
                            titulo: "Casa Moderna",
                            tipo: "Casa",
                            precio: "$250,000",
                            estado: "Activo",
                            fecha: "2024-01-20"
                        },
                        // Add more sample data as needed
                    ].map((propiedad) => (
                        <tr key={propiedad.id}>
                            <td>{propiedad.id}</td>
                            <td>
                                <Link to={`/admin/propiedades/${propiedad.id}`}>
                                    {propiedad.titulo}
                                </Link>
                            </td>
                            <td>{propiedad.tipo}</td>
                            <td>{propiedad.precio}</td>
                            <td>
                                <Badge bg={propiedad.estado === "Activo" ? "success" : "warning"}>
                                    {propiedad.estado}
                                </Badge>
                            </td>
                            <td>{propiedad.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RecentPropertiesList;