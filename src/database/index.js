import { Sequelize } from 'sequelize';
import config from '../../config/config.json' with { type: 'json' };
import 'dotenv/config';

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: parseInt(envConfig.port),
    dialect: envConfig.dialect,
  }
);

export default sequelize ;