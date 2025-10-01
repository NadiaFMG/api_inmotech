import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import { sobreNosotrosService, porqueElegirnosService } from '../services/api';

const SobreNosotros = () => {
    const [infos, setInfos] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await sobreNosotrosService.getAll();
            // Todos los registros activos
            const activos = res.data.filter(item => item.activo);
            setInfos(activos);
        };
        fetchInfo();
    }, []);

    useEffect(() => {
        const fetchCards = async () => {
            const res = await porqueElegirnosService.getAll();
            // Solo activos, ordenados y máximo 20
            const activosOrdenados = res.data
                .filter(item => item.activo)
                .sort((a, b) => Number(a.orden) - Number(b.orden))
                .slice(0, 20);
            setCards(activosOrdenados);
        };
        fetchCards();
    }, []);

    // Renderiza el icono guardado
    const renderIcon = (iconName) => {
        const IconComp = FaIcons[iconName];
        return IconComp ? <IconComp className="card-icon" /> : null;
    };

    return (
        <>
            <Container className="py-4">
                <h1 className="text-center mb-4 sobretitle">Sobre Nosotros</h1>
                {infos.map((info, idx) => (
                    <div className="sobre-nosotros-section mb-4" key={idx}>
                        <Row className="align-items-center">
                            <Col lg={6}>
                                <div className="content-wrapper">
                                    <h2 className="titulo-seccion">{info.titulo}</h2>
                                    <div className="description-container">
                                        <p>{info.descripcion}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="image-wrapper">
                                    {info.imagen_url && (
                                        <img 
                                            src={info.imagen_url.startsWith('http') ? info.imagen_url : `http://localhost:3000${info.imagen_url}`}
                                            alt={info.titulo}
                                            className="img-fluid rounded shadow"
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}

                <h2 className="text-center mb-4 sobretitle">¿Por qué elegirnos?</h2>
                <Row className="g-4">
                    {cards.map((item, index) => (
                        <Col md={6} lg={3} key={index} className="mb-4">
                            <Card className="sobre-nosotros-card">
                                <Card.Body className="card-body-custom">
                                    <div className="card-content-container">
                                        <div className="icon-container">
                                            {renderIcon(item.icono)}
                                        </div>
                                        <h5 className="card-titulo">{item.titulo}</h5>
                                        <div className="card-description">
                                            <p className="card-text">{item.descripcion}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style jsx>{`
                .sobretitle{
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                
                .sobre-nosotros-section {
                    max-height: 500px;
                    overflow: hidden;
                    background-color: #1e3a5f;
                    padding: 20px;
                    border-radius: 8px;
                    color: white;
                    margin-bottom: 2rem;
                }

                .content-wrapper {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    max-height: 500px;
                    padding-right: 15px;
                }

                .titulo-seccion {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    line-height: 1.3;
                    margin-bottom: 15px;
                    max-width: 100%;
                    color: white;
                }

                .description-container {
                    flex: 1;
                    overflow-y: auto;
                    padding-right: 10px;
                    max-height: 350px;
                    word-wrap: break-word;
                }

                .description-container p {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    color: white;
                }

                .description-container::-webkit-scrollbar {
                    width: 6px;
                }

                .description-container::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                }

                .description-container::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.3);
                    border-radius: 3px;
                }

                .description-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.5);
                }

                .image-wrapper {
                    max-height: 500px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-wrapper img {
                    max-height: 500px;
                    object-fit: cover;
                    width: 100%;
                }

                .sobre-nosotros-card {
                    height: 400px;
                    border: 2px solid #1e3a5f;
                    background: white;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(30, 58, 95, 0.1);
                    overflow: hidden;
                }

                .sobre-nosotros-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 30px rgba(30, 58, 95, 0.2);
                    border-color: #2c5aa0;
                }

                .card-body-custom {
                    height: 100%;
                    padding: 15px;
                }

                .card-content-container {
                    height: 100%;
                    overflow-y: auto;
                    text-align: center;
                    padding: 5px;
                }

                .icon-container {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card-icon {
                    font-size: 2.5rem;
                    color: #1e3a5f;
                    transition: color 0.3s ease;
                }

                .sobre-nosotros-card:hover .card-icon {
                    color: #2c5aa0;
                }

                .card-titulo {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    line-height: 1.3;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #1e3a5f;
                    margin-bottom: 15px;
                }

                .card-description {
                    margin-bottom: 0;
                }

                .card-text {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    line-height: 1.4;
                    color: #555;
                    font-size: 0.85rem;
                    margin: 0;
                    text-align: justify;
                }

                .card-content-container::-webkit-scrollbar {
                    width: 6px;
                }

                .card-content-container::-webkit-scrollbar-track {
                    background: #f8f9fa;
                    border-radius: 3px;
                }

                .card-content-container::-webkit-scrollbar-thumb {
                    background: #1e3a5f;
                    border-radius: 3px;
                }

                .card-content-container::-webkit-scrollbar-thumb:hover {
                    background: #2c5aa0;
                }

                @media (max-width: 768px) {
                    .sobre-nosotros-section {
                        max-height: none;
                    }
                    
                    .content-wrapper {
                        max-height: none;
                        padding-right: 0;
                    }
                    
                    .description-container {
                        max-height: 300px;
                    }

                    .sobre-nosotros-card {
                        height: 350px;
                    }

                    .card-titulo {
                        font-size: 0.9rem;
                    }

                    .card-icon {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
};

export default SobreNosotros;