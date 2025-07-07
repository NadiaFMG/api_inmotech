import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginacion = ({ paginaActual, totalPaginas, onPageChange }) => {
    const renderPaginationItems = () => {
        let items = [];
        
        // Siempre mostrar primera página
        items.push(
            <Pagination.First 
                key="first" 
                disabled={paginaActual === 1}
                onClick={() => onPageChange(1)}
            />
        );

        // Botón anterior
        items.push(
            <Pagination.Prev 
                key="prev" 
                disabled={paginaActual === 1}
                onClick={() => onPageChange(paginaActual - 1)}
            />
        );

        // Páginas numeradas
        for (let number = 1; number <= totalPaginas; number++) {
            if (
                number === 1 || // Primera página
                number === totalPaginas || // Última página
                (number >= paginaActual - 1 && number <= paginaActual + 1) // Páginas cercanas a la actual
            ) {
                items.push(
                    <Pagination.Item
                        key={number}
                        active={number === paginaActual}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </Pagination.Item>
                );
            } else if (
                number === paginaActual - 2 ||
                number === paginaActual + 2
            ) {
                items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} />);
            }
        }

        // Botón siguiente
        items.push(
            <Pagination.Next
                key="next"
                disabled={paginaActual === totalPaginas}
                onClick={() => onPageChange(paginaActual + 1)}
            />
        );

        // Siempre mostrar última página
        items.push(
            <Pagination.Last
                key="last"
                disabled={paginaActual === totalPaginas}
                onClick={() => onPageChange(totalPaginas)}
            />
        );

        return items;
    };

    return (
        <div className="d-flex justify-content-center my-4">
            <Pagination>{renderPaginationItems()}</Pagination>
        </div>
    );
};

export default Paginacion;