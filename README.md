# 🧠 BrainrotBot - Discord Bot para Fortnite Creative

Bot de Discord con temática **Brainrot** diseñado para servidores de mapas de Fortnite Creative. Incluye comandos divertidos, sistema de mapas, sorteos, encuestas y mucho más!

## 🚀 Hosting 24/7 Gratis

¿Quieres que tu bot esté activo 24/7 sin dejar tu PC encendida? **[Lee la guía completa de deployment aquí](DEPLOYMENT.md)** 📖

**Opciones gratuitas:**
- **Railway.app** ⭐ (Recomendado - $5 gratis/mes)
- **Render.com** (750 horas gratis/mes)
- **Oracle Cloud** 💎 (Gratis para siempre)
- **Replit** (Gratis con limitaciones)

## 🎮 Características

### 🎪 Comandos de Brainrot
- `/sound` - 🔊 Reproduce sonidos épicos de Brainrot en tu canal de voz (8 sonidos disponibles)
- `/meme` - Memes random de Brainrot
- `/quote` - Frases legendarias
- `/rizz` - Líneas de rizz supremo
- `/sigma` - Frases sigma motivacionales
- `/ohio` - Only in Ohio... 💀
- `/skibidi` - Skibidi references

### 🗺️ Comandos de Mapas
- `/submit-map` - Envía tu código de mapa
- `/random-map` - Mapa aleatorio para jugar
- `/maps` - Lista de mapas disponibles
- `/vote-map` - Vota por tu mapa favorito
- `/leaderboard` - Top mapas más votados

### 🎉 Comandos de Comunidad
- `/giveaway` - Crea un sorteo
- `/poll` - Crea una encuesta
- `/challenge` - Recibe un challenge random
- `/ship` - Compatibilidad entre usuarios
- `/vibe-check` - Chequea tu vibe del día

### 😂 Comandos Divertidos
- `/8ball` - Pregúntale a la bola mágica brainrot
- `/roast` - Recibe un roast brainrot

### ⚙️ Comandos Generales
- `/help` - Lista de comandos
- `/ping` - Latencia del bot
- `/info` - Información del servidor

## 📦 Instalación

### Requisitos previos
- Node.js v16.9.0 o superior
- npm (Node Package Manager)
- Una cuenta de Discord Developer

### Paso 1: Clonar o descargar el proyecto
```bash
cd BrainrotBot
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Configurar el bot

1. Ve al [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)
2. Crea una nueva aplicación
3. Ve a la sección "Bot" y crea un bot
4. Copia el token del bot
5. Copia el ID de la aplicación (Application ID)
6. **Copia `config.example.json` como `config.json`** y actualiza con tus datos:

```bash
# Windows
copy config.example.json config.json

# Linux/Mac
cp config.example.json config.json
```

Luego edita `config.json`:
```json
{
    "token": "TU_TOKEN_AQUI",
    "botId": "TU_BOT_ID_AQUI",
    "server": "NombreDetuServidor"
}
```

**⚠️ IMPORTANTE:** Nunca compartas tu `config.json` ni subas el archivo con tu token real a GitHub.

### Paso 4: Invitar el bot a tu servidor

URL de invitación (reemplaza CLIENT_ID con tu Bot ID):
```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8866461766385655&scope=bot%20applications.commands
```

**IMPORTANTE:** Esta URL incluye TODOS los permisos necesarios (8866461766385655). El bot necesita estos permisos para:
- Crear y gestionar canales/categorías (`/setup-server`)
- Gestionar roles y miembros
- Enviar mensajes y embeds
- Añadir reacciones (sorteos)
- Conectarse y hablar en voz (`/sound`)

### Paso 5: Registrar los comandos slash
```bash
npm run register
```

### Paso 6: Iniciar el bot
```bash
npm start
```

## 🚀 Uso

Una vez que el bot esté en línea, puedes usar cualquiera de los comandos escribiendo `/` en Discord y seleccionando el comando deseado.

### Ejemplos de uso:

**Enviar un mapa:**
```
/submit-map codigo:1234-5678-9012 nombre:Mi Mapa Épico descripcion:Un mapa de parkour brutal
```

**Crear un sorteo:**
```
/giveaway premio:V-Bucks duracion:60 ganadores:1
```

**Crear una encuesta:**
```
/poll pregunta:Cual es el mejor mapa? opcion1:Parkour opcion2:Deathrun opcion3:BoxFight
```

## 📁 Estructura del Proyecto

```
BrainrotBot/
├── src/
│   ├── index.js                 # Archivo principal del bot
│   ├── slashCommands/          # Todos los comandos slash
│   │   ├── ping.js
│   │   ├── help.js
│   │   ├── sound.js
│   │   ├── meme.js
│   │   └── ... (20+ comandos)
│   └── utils/
│       ├── createCommand.js     # Script para registrar comandos
│       └── mapsManager.js       # Gestor de mapas
├── data/
│   └── maps.json               # Base de datos de mapas
├── config.json                 # Configuración del bot
├── package.json
└── README.md
```

## 🛠️ Personalización

### Añadir nuevos sonidos
Edita `src/slashCommands/sound.js` y añade nuevos objetos al array `sounds`:
```javascript
{
    name: 'Nombre del Sonido',
    description: 'Descripción',
    url: 'URL_del_sonido',
    emoji: '🔊'
}
```

### Añadir nuevos memes
Edita `src/slashCommands/meme.js` y añade nuevos objetos al array `memes`.

### Añadir nuevos quotes
Edita `src/slashCommands/quote.js` y añade nuevos objetos al array `quotes`.

## 🔧 Scripts disponibles

- `npm start` - Inicia el bot
- `npm run register` - Registra los comandos slash en Discord

## 🤝 Contribuir

Si quieres añadir nuevas funcionalidades:
1. Crea un nuevo archivo en `src/slashCommands/`
2. Sigue la estructura de los comandos existentes
3. Registra los comandos con `npm run register`
4. Reinicia el bot

## 📝 Notas importantes

- El bot necesita permisos de administrador para funcionar correctamente
- Los sorteos funcionan con reacciones, asegúrate de que el bot pueda añadir reacciones
- Los mapas se guardan en `data/maps.json`
- Los votos son acumulativos y permanentes

## 🎯 Comandos más populares

1. **`/sound`** - Perfecto para spam en voz 🔊
2. **`/giveaway`** - Mantiene la comunidad activa 🎁
3. **`/random-map`** - Descubre nuevos mapas 🗺️
4. **`/roast`** - Diversión garantizada 🔥
5. **`/vibe-check`** - Interaction diaria ✨

## 🆘 Solución de problemas

**El bot no responde:**
- Verifica que el token sea correcto
- Asegúrate de haber registrado los comandos con `npm run register`
- Revisa que el bot tenga los permisos necesarios

**Los comandos no aparecen:**
- Ejecuta `npm run register` de nuevo
- Espera unos minutos (puede tardar en propagarse)
- Verifica que el botId sea correcto

**Error al guardar mapas:**
- Asegúrate de que la carpeta `data/` existe
- Verifica los permisos de escritura

## 📜 Licencia

ISC License

## 👨‍💻 Autor

Desarrollado por COD para la comunidad de Fortnite Creative

---

**¡Disfruta del bot y que el rizz te acompañe! 🧠💀**

*"Only in Ohio would someone create a bot this goofy ahh" - Sigma Male Philosophy*
