import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { carruselService } from '../../services/api';

const PropertyCarousel = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCarrusel = async () => {
            const res = await carruselService.getAll();
            // Solo activos y ordenados por 'orden'
            const activosOrdenados = res.data
                .filter(item => item.activo)
                .sort((a, b) => Number(a.orden) - Number(b.orden));
            setItems(activosOrdenados);
        };
        fetchCarrusel();
    }, []);

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `http://localhost:3000${url}`;
    };

    return (
        <Carousel className="property-carousel">
            {items.map(item => (
                <Carousel.Item key={item.id}>
                    {item.imagen_url && (
                        <img
                            className="d-block w-100"
                            src={getImageUrl(item.imagen_url)}
                            alt={item.titulo}
                            style={{ height: '870px', objectFit: 'cover' }}
                        />
                    )}
                    <Carousel.Caption>
                        <h3>{item.titulo}</h3>
                        <p>{item.descripcion}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default PropertyCarousel;