import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { favoritoService } from '../../services/api'; // ← CAMBIO: usar favoritoService

const IconoFavorito = ({ inmuebleId, userId, esFavoritoInicial = false, size = "1.2rem", className = "" }) => {
    const [esFavorito, setEsFavorito] = useState(esFavoritoInicial);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar estado inicial del favorito
    useEffect(() => {
        const cargarEstadoFavorito = async () => {
            try {
                console.log(`🔍 Cargando estado favorito para usuario ${userId}, inmueble ${inmuebleId}`);
                
                // ✅ USAR NUEVO SERVICIO DE FAVORITOS
                const response = await favoritoService.esFavorito(userId, inmuebleId);
                
                console.log(`📋 Estado favorito recibido:`, response.data);
                setEsFavorito(response.data.es_favorito || false);
            } catch (error) {
                console.error('❌ Error al cargar estado favorito:', error);
                setEsFavorito(esFavoritoInicial);
            }
        };

        // ✅ VALIDAR QUE TENGAMOS AMBOS IDs
        if (inmuebleId && userId) {
            cargarEstadoFavorito();
        } else {
            console.warn('⚠️ Faltan parámetros: userId o inmuebleId');
        }
    }, [inmuebleId, userId, esFavoritoInicial]);

    const handleToggleFavorito = async (e) => {
        e.stopPropagation(); // Evitar que se active el click del card
        
        if (isLoading) return;
        
        // ✅ VALIDAR QUE TENGAMOS LOS IDs NECESARIOS
        if (!userId) {
            alert('Debes iniciar sesión para agregar favoritos');
            return;
        }
        
        if (!inmuebleId) {
            alert('Error: ID de inmueble no válido');
            return;
        }
        
        setIsLoading(true);
        
        try {
            console.log(`🔄 Cambiando favorito para usuario ${userId}, inmueble ${inmuebleId}...`);
            console.log(`📊 Estado actual: ${esFavorito ? 'FAVORITO' : 'NO FAVORITO'}`);
            
            // ✅ USAR NUEVO SERVICIO DE FAVORITOS
            const response = await favoritoService.toggleFavorito(userId, inmuebleId);
            
            console.log(`✅ Respuesta del servidor:`, response.data);
            console.log(`🎯 Nuevo estado: ${response.data.es_favorito ? 'FAVORITO' : 'NO FAVORITO'}`);
            
            // ✅ USAR LA PROPIEDAD CORRECTA
            setEsFavorito(response.data.es_favorito);
            
            // Opcional: mostrar notificación
            alert(response.data.mensaje);
            
        } catch (error) {
            console.error('❌ Error al cambiar favorito:', error);
            console.error('❌ Error response:', error.response?.data);
            
            // Revertir el estado en caso de error
            // setEsFavorito(prev => !prev); // ← COMENTADO para evitar cambios incorrectos
            
            // Mostrar error al usuario
            alert(`Error: ${error.response?.data?.mensaje || error.message || 'No se pudo cambiar el favorito'}`);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(`🎨 Renderizando IconoFavorito - Usuario: ${userId}, Inmueble: ${inmuebleId}, Estado: ${esFavorito ? 'FAVORITO' : 'NO FAVORITO'}`);

    return (
        <button
            onClick={handleToggleFavorito}
            disabled={isLoading || !userId} // ✅ Deshabilitar si no hay usuario
            className={`favorito-btn ${className}`}
            style={{
                background: 'none',
                border: 'none',
                cursor: (isLoading || !userId) ? 'not-allowed' : 'pointer',
                padding: '5px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.6 : (!userId ? 0.4 : 1) // ✅ Opacidad diferente si no hay usuario
            }}
            title={
                !userId 
                    ? 'Inicia sesión para agregar favoritos'
                    : (esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos')
            }
        >
            {esFavorito ? (
                <FaHeart 
                    style={{ 
                        color: '#dc3545', 
                        fontSize: size,
                        transform: isLoading ? 'scale(0.9)' : 'scale(1)',
                        transition: 'transform 0.1s ease'
                    }} 
                />
            ) : (
                <FaRegHeart 
                    style={{ 
                        color: !userId ? '#ccc' : '#6c757d', // ✅ Color diferente si no hay usuario
                        fontSize: size,
                        transform: isLoading ? 'scale(0.9)' : 'scale(1)',
                        transition: 'transform 0.1s ease'
                    }} 
                />
            )}
        </button>
    );
};

export default IconoFavorito;