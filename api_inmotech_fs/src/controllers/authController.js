// authController.js
import jwt from 'jsonwebtoken';
import ApiUser from '../models/api_users.js';
import bcrypt from 'bcrypt';

export async function loginApiUser(req, res) {
    try {
        const { Api_user, Api_password } = req.body;

        const apiUser = await ApiUser.findOne({
            where: { Api_user },
        });

        if (!apiUser) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Compara la contraseña proporcionada con el hash almacenado
        const passwordMatch = await bcrypt.compare(Api_password, apiUser.Api_password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                apiUserId: apiUser.Api_user_id,
                apiUsername: apiUser.Api_user,
                role: apiUser.Api_role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Opcional: Si también quieres una función de registro para api_users
export async function registerApiUser(req, res) {
    try {
        const { Api_user, Api_password, Api_role, Api_status } = req.body;

        // Verifica si el usuario ya existe
        const existingUser = await ApiUser.findOne({ where: { Api_user } });
        if (existingUser) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        // El hashing de la contraseña ahora se realiza automáticamente en el hook beforeCreate del modelo ApiUser
        const newApiUser = await ApiUser.create({
            Api_user,
            Api_password, // La contraseña se hasheará automáticamente por el hook
            Api_role,
            Api_status,
        });

        res.status(201).json({ message: 'Usuario de API creado exitosamente', userId: newApiUser.Api_user_id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}