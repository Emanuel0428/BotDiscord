# 🚀 Guía de Deployment - BrainrotBot

Esta guía te ayudará a hostear tu bot 24/7 **GRATIS** en diferentes plataformas.

---

## 📋 **Antes de empezar:**

### 1. **Preparar el código para GitHub:**

```bash
# Inicializar git (si no lo has hecho)
git init

# Añadir archivos
git add .

# Hacer commit
git commit -m "Initial commit - BrainrotBot"
```

### 2. **Crear repositorio en GitHub:**

- Ve a [github.com](https://github.com) y crea una cuenta
- Crea un nuevo repositorio (público o privado)
- Sigue las instrucciones para subir tu código

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

---

## 🌐 **OPCIÓN 1: Railway.app** ⭐ (Recomendado - Más Fácil)

### **Ventajas:**

- ✅ $5 USD de créditos gratis al mes
- ✅ Deploy automático desde GitHub
- ✅ No se duerme
- ✅ Súper fácil de configurar

### **Pasos:**

1. **Ve a [railway.app](https://railway.app)** y crea una cuenta con GitHub
2. **Click en "New Project" → "Deploy from GitHub repo"**
3. **Selecciona tu repositorio de BrainrotBot**
4. **Configurar variables de entorno:**

   - Click en tu proyecto → Variables
   - Añade estas variables:
     ```
     TOKEN=tu_token_de_discord_aqui
     BOT_ID=tu_bot_id_aqui
     SERVER=BrainrotServer
     ```
5. **¡Listo!** Railway detectará automáticamente que es un proyecto Node.js y lo desplegará

### **Monitoreo:**

- Ve a "Deployments" para ver logs en tiempo real
- El bot se reiniciará automáticamente si hay errores

---

## 🎨 **OPCIÓN 2: Render.com**

### **Ventajas:**

- ✅ 750 horas gratis al mes
- ✅ Muy confiable
- ⚠️ Se duerme tras 15 min de inactividad (despierta rápido)

### **Pasos:**

1. **Ve a [render.com](https://render.com)** y crea una cuenta
2. **Click en "New +" → "Web Service"**
3. **Conecta tu repositorio de GitHub**
4. **Configuración:**

   - **Name:** BrainrotBot
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Plan:** Free
5. **Variables de entorno:**

   - Ve a "Environment"
   - Añade:
     ```
     TOKEN=tu_token_aqui
     BOT_ID=tu_bot_id_aqui
     SERVER=BrainrotServer
     ```
6. **Deploy!**

### **Mantenerlo despierto:**

Para evitar que se duerma, puedes usar [UptimeRobot](https://uptimerobot.com) para hacer ping cada 5 minutos (gratis).

---

## ☁️ **OPCIÓN 3: Oracle Cloud (Always Free)** 💎

### **Ventajas:**

- ✅ 100% gratis PARA SIEMPRE
- ✅ Nunca se duerme
- ✅ Recursos generosos
- ⚠️ Más técnico de configurar

### **Requisitos:**

- Tarjeta de crédito/débito (no se cobra, solo verificación)
- Conocimientos básicos de Linux

### **Pasos:**

1. **Crear cuenta en [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)**
2. **Crear una instancia VM:**

   - Compute → Instances → Create Instance
   - Imagen: Ubuntu 22.04
   - Shape: VM.Standard.E2.1.Micro (Always Free)
3. **Conectar por SSH y configurar:**

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar dependencias de audio
sudo apt install -y ffmpeg

# Instalar git
sudo apt install -y git

# Clonar tu repositorio
git clone https://github.com/Emanuel0428/BotDiscord.git
cd BotDiscord

# Instalar dependencias
npm install

# Crear archivo .env
nano .env
```

4. **Configurar .env:**

```
TOKEN=tu_token_aqui
BOT_ID=tu_bot_id_aqui
SERVER=BrainrotServer
```

5. **Instalar PM2 (para mantener el bot corriendo):**

```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar el bot
pm2 start src/index.js --name brainrotbot

# Configurar PM2 para iniciar al arrancar
pm2 startup
pm2 save

# Ver logs
pm2 logs brainrotbot
```

### **Comandos útiles de PM2:**

```bash
pm2 restart brainrotbot  # Reiniciar
pm2 stop brainrotbot     # Detener
pm2 logs brainrotbot     # Ver logs
pm2 monit                # Monitor en tiempo real
```

---

## 🔄 **OPCIÓN 4: Replit**

### **Ventajas:**

- ✅ Súper fácil, interfaz web
- ✅ No necesitas GitHub
- ⚠️ Se duerme si no hay actividad
- ⚠️ Recursos limitados

### **Pasos:**

1. **Ve a [replit.com](https://replit.com)** y crea una cuenta
2. **Create → Node.js**
3. **Sube tus archivos** (arrastra la carpeta completa)
4. **Crea archivo `.env`** en Secrets (candado en el panel izquierdo):

   ```
   TOKEN=tu_token
   BOT_ID=tu_bot_id
   SERVER=BrainrotServer
   ```
5. **En el archivo principal, cambia a:**

   ```javascript
   // En la primera línea de index.js
   require('dotenv').config()
   ```
6. **Click en "Run"**

### **Mantenerlo despierto:**

Usa [UptimeRobot](https://uptimerobot.com) para hacer ping cada 5 minutos.

---

## 📊 **Comparación rápida:**

| Plataforma           | Costo         | Uptime | Facilidad  | Recursos   |
| -------------------- | ------------- | ------ | ---------- | ---------- |
| **Railway** ⭐ | $5/mes gratis | 100%   | ⭐⭐⭐⭐⭐ | Buenos     |
| **Render**     | 750h gratis   | 95%    | ⭐⭐⭐⭐   | Buenos     |
| **Oracle** 💎  | 100% gratis   | 100%   | ⭐⭐⭐     | Excelentes |
| **Replit**     | Gratis        | 80%    | ⭐⭐⭐⭐⭐ | Limitados  |

---

## 🔧 **Troubleshooting:**

### **Bot no inicia:**

- Verifica que las variables de entorno estén correctas
- Revisa los logs de la plataforma
- Asegúrate de que `npm install` se ejecutó correctamente

### **Bot se desconecta:**

- Verifica que tienes suficientes créditos/horas
- Revisa los logs para errores
- Asegúrate de que el token sea válido

### **Comandos no funcionan:**

- Ejecuta `npm run register` una sola vez después de deployar
- Espera 1-2 minutos para que Discord los registre
- Verifica que el bot tenga permisos en el servidor

---

## 📝 **Notas importantes:**

1. **Nunca compartas tu token** en GitHub o públicamente
2. **Siempre usa variables de entorno** para datos sensibles
3. **Haz backups** de tu carpeta `data/` periódicamente
4. **Monitorea el bot** regularmente para detectar problemas

---

## 🆘 **Recursos útiles:**

- [Discord.js Guide](https://discordjs.guide/)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Oracle Cloud Docs](https://docs.oracle.com/en-us/iaas/Content/home.htm)

---

**¡Felicidades! Tu bot ahora está corriendo 24/7** 🎉🧠💀
