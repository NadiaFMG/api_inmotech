import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';

const PropertyGallery = ({ imagenes, videos }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <Carousel className="property-gallery mb-4">
                {imagenes.map((imagen, index) => (
                    <Carousel.Item 
                        key={index}
                        onClick={() => {
                            setSelectedIndex(index);
                            setShowModal(true);
                        }}
                    >
                        <img
                            className="d-block w-100"
                            src={imagen}
                            alt={`Vista ${index + 1}`}
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                ))}
                {videos && videos.map((video, index) => (
                    <Carousel.Item key={`video-${index}`}>
                        <video
                            className="d-block w-100"
                            controls
                            style={{ height: '400px', objectFit: 'cover' }}
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)}
                size="lg"
            >
                <Modal.Body>
                    <img
                        src={imagenes[selectedIndex]}
                        alt="Vista ampliada"
                        style={{ width: '100%' }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PropertyGallery;