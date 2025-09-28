# 🚀 Comandos de Desarrollo - API Inmotech FS

## 📖 Diferencia entre comandos

### 🔧 `npm run dev` - Desarrollo Local
```bash
npm run dev
```
**¿Qué hace?**
- ✅ Establece `NODE_ENV=development`
- ✅ Servidor escucha solo en `localhost`
- ✅ CORS configurado para `http://localhost:3001`
- ✅ Usa nodemon para recarga automática
- ✅ Ideal para desarrollo en tu computadora

**URL de acceso:** `http://localhost:3000`

---

### 🌐 `npm start` - Red Local/Producción
```bash
npm start
```
**¿Qué hace?**
- ✅ Usa ambiente de producción (sin NODE_ENV=development)
- ✅ Servidor escucha en todas las interfaces (`0.0.0.0`)
- ✅ CORS abierto para cualquier origen
- ✅ Usa node (sin recarga automática)
- ✅ Ideal para acceso desde móviles/otros dispositivos

**URLs de acceso:**
- Local: `http://localhost:3000`
- Red: `http://192.168.20.21:3000` (desde otros dispositivos)

---

### 🖥️ Para Windows (alternativo)
Si tienes problemas con variables de entorno en Windows:
```bash
npm run dev:windows
```

## 🔄 Flujo de trabajo recomendado

1. **Desarrollo en PC:** `npm run dev`
2. **Pruebas desde móvil:** `npm start`
3. **Producción:** `npm start`

## 📱 Conectar desde móvil

1. Ejecuta `npm start` (no `npm run dev`)
2. Asegúrate que tu móvil esté en la misma WiFi
3. Usa la URL: `http://192.168.20.21:3000/api`
4. Verifica que el firewall permita el puerto 3000

## ✅ Verificar que funciona

**Para desarrollo:**
```
GET http://localhost:3000/api/auth/test
```

**Para red local:**
```
GET http://192.168.20.21:3000/api/auth/test
```

## 🆘 Troubleshooting

**Si no conecta desde móvil:**
1. Verifica tu IP real: `ipconfig` en CMD
2. Actualiza la IP en el código si cambió
3. Asegúrate de usar `npm start` (no `npm run dev`)
4. Desactiva firewall temporalmente para probar