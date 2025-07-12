const db = require('../models');

const getInmuebleCompleto = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca el inmueble principal
        const inmueble = await db.Inmueble.findByPk(id);

        if (!inmueble) {
            return res.status(404).json({ message: 'Inmueble no encontrado' });
        }

        // Obtiene datos relacionados usando los FK del inmueble
        const [
            acercaEdificacion,
            otrasCaracteristicas,
            asignacion,
            organizacionParqueadero,
            division,
            imagenesInmueble,
            direccion,
            designadorCardinal,
            localizacion,
            barrioCiudadCorregimientoVereda,
            barrio,
            ciudad,
            corregimiento,
            vereda,
            municipio,
            ndap
        ] = await Promise.all([
            inmueble.Acerca_edificacion_FK ? db.AcercaEdificacion.findByPk(inmueble.Acerca_edificacion_FK) : null,
            inmueble.Otras_caracteristicas_FK ? db.OtrasCaracteristicas.findByPk(inmueble.Otras_caracteristicas_FK) : null,
            inmueble.Asignacion_FK ? db.Asignacion.findByPk(inmueble.Asignacion_FK) : null,
            inmueble.Organizacion_parqueadero_FK ? db.OrganizacionParqueadero.findByPk(inmueble.Organizacion_parqueadero_FK) : null,
            inmueble.Division_FK ? db.Division.findByPk(inmueble.Division_FK) : null,
            inmueble.Imagenes_inmueble_FK ? db.ImagenesInmueble.findByPk(inmueble.Imagenes_inmueble_FK) : null,
            inmueble.Direccion_FK ? db.Direccion.findByPk(inmueble.Direccion_FK) : null,
            inmueble.Designador_cardinal_FK ? db.DesignadorCardinal.findByPk(inmueble.Designador_cardinal_FK) : null,
            inmueble.Localizacion_FK ? db.Localizacion.findByPk(inmueble.Localizacion_FK) : null,
            inmueble.Barrio_Ciudad_Corregimiento_Vereda_FK ? db.BarrioCiudadCorregimientoVereda.findByPk(inmueble.Barrio_Ciudad_Corregimiento_Vereda_FK) : null,
            inmueble.Barrio_FK ? db.Barrio.findByPk(inmueble.Barrio_FK) : null,
            inmueble.Ciudad_FK ? db.Ciudad.findByPk(inmueble.Ciudad_FK) : null,
            inmueble.Corregimiento_FK ? db.Corregimiento.findByPk(inmueble.Corregimiento_FK) : null,
            inmueble.Vereda_FK ? db.Vereda.findByPk(inmueble.Vereda_FK) : null,
            inmueble.Municipio_FK ? db.Municipio.findByPk(inmueble.Municipio_FK) : null,
            inmueble.NDAP_FK ? db.NDAP.findByPk(inmueble.NDAP_FK) : null
        ]);

        res.json({
            inmueble,
            acercaEdificacion,
            otrasCaracteristicas,
            asignacion,
            organizacionParqueadero,
            division,
            imagenesInmueble,
            direccion,
            designadorCardinal,
            localizacion,
            barrioCiudadCorregimientoVereda,
            barrio,
            ciudad,
            corregimiento,
            vereda,
            municipio,
            ndap
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el inmueble completo', error: error.message });
    }
};

module.exports = { getInmuebleCompleto };