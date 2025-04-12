// authController.js
import jwt from 'jsonwebtoken';
import users from '../models/users.js';
import role from '../models/role.js';
import bcrypt from 'bcrypt'; // Importa bcrypt

export async function login(req, res) {
    try {
        const { User_user, User_password } = req.body;

        
        

        const user = await users.findOne({
            where: { User_user },
            include: [{ model: role, attributes: ['Role_name'] }],
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Compara la contraseña proporcionada con el hash almacenado
        const passwordMatch = await bcrypt.compare(User_password, user.User_password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                userId: user.User_id,
                username: user.User_user,
                role: user.role.Role_name,
            },
            process.env.JWT_SECRET, // Usa la variable de entorno
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//*suve