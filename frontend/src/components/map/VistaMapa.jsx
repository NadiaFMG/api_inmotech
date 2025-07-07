import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const VistaMapa = ({ inmuebles }) => {
    const [selectedInmueble, setSelectedInmueble] = useState(null);

    const mapStyles = {
        height: "500px",
        width: "100%"
    };

    const defaultCenter = {
        lat: 4.570868,
        lng: -74.297333
    };

    return (
        <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
            <div className="mapa-container mb-4">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={5}
                    center={defaultCenter}
                >
                    {inmuebles && inmuebles.map(inmueble => (
                        inmueble.latitud && inmueble.longitud && (
                            <Marker
                                key={inmueble.id}
                                position={{
                                    lat: parseFloat(inmueble.latitud),
                                    lng: parseFloat(inmueble.longitud)
                                }}
                                onClick={() => setSelectedInmueble(inmueble)}
                            />
                        )
                    ))}

                    {selectedInmueble && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(selectedInmueble.latitud),
                                lng: parseFloat(selectedInmueble.longitud)
                            }}
                            onCloseClick={() => setSelectedInmueble(null)}
                        >
                            <div className="info-window">
                                <h6>{selectedInmueble.titulo}</h6>
                                <p>
                                    <strong>Precio: </strong>${selectedInmueble.precio}<br/>
                                    <strong>Tipo: </strong>{selectedInmueble.tipoPropiedad}<br/>
                                    <strong>Ubicación: </strong>{selectedInmueble.ubicacion}
                                </p>
                                <a 
                                    href={`/inmueble/${selectedInmueble.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Ver Detalles
                                </a>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default VistaMapa;