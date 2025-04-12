import estadoPago from '../models/estado_pago.js';

// Obtener todos los estados de pago
export async function getAllEstadosPago(req, res) {
    try {
        const allEstadosPago = await estadoPago.findAll();
        res.json(allEstadosPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un estado de pago por ID
export async function getEstadoPagoById(req, res) {
    try {
        const estadoPagoItem = await estadoPago.findByPk(req.params.id);
        if (estadoPagoItem) {
            res.json(estadoPagoItem);
        } else {
            res.status(404).json({ message: 'Estado de pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo estado de pago
export async function createEstadoPago(req, res) {
    try {
        const newEstadoPago = await estadoPago.create(req.body);
        res.status(201).json(newEstadoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un estado de pago
export async function updateEstadoPago(req, res) {
    try {
        const updatedEstadoPago = await estadoPago.update(req.body, {
            where: { Estado_pago_id: req.params.id },
        });
        if (updatedEstadoPago[0]) {
            res.json({ message: 'Estado de pago actualizado' });
        } else {
            res.status(404).json({ message: 'Estado de pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un estado de pago
export async function deleteEstadoPago(req, res) {
    try {
        const deletedEstadoPago = await estadoPago.destroy({
            where: { Estado_pago_id: req.params.id },
        });
        if (deletedEstadoPago) {
            res.json({ message: 'Estado de pago eliminado' });
        } else {
            res.status(404).json({ message: 'Estado de pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
