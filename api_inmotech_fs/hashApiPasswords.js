// hashApiPasswords.js
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';

// Configura la conexión a tu base de datos (asegúrate de que coincida con tu configuración)
const sequelize = new Sequelize('inmotech_fs_development', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

async function hashApiPasswords() {
    try {
        // Conéctate a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // Obtén el modelo de usuarios de la API
        const api_users = sequelize.define('api_users', {
            Api_user_id: { type: Sequelize.INTEGER, primaryKey: true },
            Api_password: Sequelize.STRING,
            // Otros campos...
        }, { timestamps: false }); // Si tu tabla no tiene timestamps, déjalo así

        // Obtén todos los usuarios de la API
        const allApiUsers = await api_users.findAll();

        // Hashea las contraseñas y actualiza la base de datos
        for (const user of allApiUsers) {
            // Verifica si la contraseña ya está hasheada (opcional, para evitar doble hashing)
            if (!user.Api_password.startsWith('$2b$')) {
                const hashedPassword = await bcrypt.hash(user.Api_password, 10); // 10 es el número de rondas de hashing
                await api_users.update({ Api_password: hashedPassword }, { where: { Api_user_id: user.Api_user_id } });
                console.log(`Contraseña hasheada para el usuario de API ${user.Api_user_id}`);
            } else {
                console.log(`La contraseña para el usuario de API ${user.Api_user_id} ya parece estar hasheada.`);
            }
        }

        console.log('Todas las contraseñas de la API han sido revisadas.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await sequelize.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}

hashApiPasswords();