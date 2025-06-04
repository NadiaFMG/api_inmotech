// hashPasswords.js
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';

// Configura la conexión a tu base de datos
const sequelize = new Sequelize('inmotech_fs_development', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

async function hashPasswords() {
    try {
        // Conéctate a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // Obtén el modelo de usuarios
        const users = sequelize.define('users', {
            User_id: { type: Sequelize.INTEGER, primaryKey: true },
            User_password: Sequelize.STRING,
            // Otros campos...
        }, { timestamps: false });

        // Obtén todos los usuarios
        const allUsers = await users.findAll();

        // Hashea las contraseñas y actualiza la base de datos
        for (const user of allUsers) {
            const hashedPassword = await bcrypt.hash(user.User_password, 10); // 10 es el número de rondas de hashing
            await users.update({ User_password: hashedPassword }, { where: { User_id: user.User_id } });
            console.log(`Contraseña hasheada para el usuario ${user.User_id}`);
        }

        console.log('Todas las contraseñas han sido hasheadas.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await sequelize.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}

hashPasswords();