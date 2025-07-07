import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const ViewsList = ({ views }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="mb-4">
            <h4>Registro de Visualizaciones</h4>
            <Table responsive striped hover>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Inmueble</th>
                        <th>Fecha</th>
                        <th>Tiempo</th>
                        <th>Dispositivo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {views.map((view, index) => (
                        <tr key={index}>
                            <td>{view.userName}</td>
                            <td>{view.propertyTitle}</td>
                            <td>{formatDate(view.date)}</td>
                            <td>{view.duration} min</td>
                            <td>{view.device}</td>
                            <td>
                                <Badge bg={view.completed ? 'success' : 'warning'}>
                                    {view.completed ? 'Completada' : 'Parcial'}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewsList;