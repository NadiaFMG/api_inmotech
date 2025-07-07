import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapInput = ({ location, onLocationChange }) => {
    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    const defaultCenter = {
        lat: 4.570868,
        lng: -74.297333
    };

    const handleMapClick = (e) => {
        onLocationChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    };

    return (
        <div className="mb-4">
            <h4 className="mb-3">Ubicación</h4>
            <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={location || defaultCenter}
                    onClick={handleMapClick}
                >
                    {location && (
                        <Marker
                            position={location}
                            draggable={true}
                            onDragEnd={(e) => handleMapClick(e)}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapInput;