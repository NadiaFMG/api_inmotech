import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const configFile = './config/config.json';
let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

function replaceVars(obj) {
  for (let key in obj) {
    console.log("Objeto actual:", obj);
    if (typeof obj[key] === 'string' && obj[key].startsWith('${') && obj[key].endsWith('}')) {
      const varName = obj[key].slice(2, -1);
      const varValue = process.env[varName];
      console.log(`Variable ${varName}: ${varValue}`);
      console.log(`Reemplazando ${obj[key]} con ${varValue}`);
      obj[key] = varValue;
    } else if (typeof obj[key] === 'object') {
      replaceVars(obj[key]); // Llamada recursiva para objetos anidados
    }
  }
}

replaceVars(config);
fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
console.log('Variables de entorno reemplazadas en config.json');