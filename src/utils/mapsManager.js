const fs = require('fs');
const path = require('path');

const mapsFilePath = path.join(__dirname, '../../data/maps.json');

// Función para leer mapas
function readMaps() {
    try {
        if (!fs.existsSync(mapsFilePath)) {
            return [];
        }
        const data = fs.readFileSync(mapsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo mapas:', error);
        return [];
    }
}

// Función para guardar mapas
function saveMaps(maps) {
    try {
        const dir = path.dirname(mapsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(mapsFilePath, JSON.stringify(maps, null, 2));
        return true;
    } catch (error) {
        console.error('Error guardando mapas:', error);
        return false;
    }
}

// Función para añadir un mapa
function addMap(mapData) {
    const maps = readMaps();
    const newMap = {
        id: Date.now().toString(),
        code: mapData.code,
        name: mapData.name,
        description: mapData.description,
        submittedBy: mapData.submittedBy,
        submittedAt: new Date().toISOString(),
        votes: 0,
        plays: 0
    };
    maps.push(newMap);
    saveMaps(maps);
    return newMap;
}

// Función para obtener un mapa aleatorio
function getRandomMap() {
    const maps = readMaps();
    if (maps.length === 0) return null;
    return maps[Math.floor(Math.random() * maps.length)];
}

// Función para votar por un mapa
function voteMap(mapId) {
    const maps = readMaps();
    const map = maps.find(m => m.id === mapId);
    if (map) {
        map.votes++;
        saveMaps(maps);
        return map;
    }
    return null;
}

// Función para obtener top mapas
function getTopMaps(limit = 10) {
    const maps = readMaps();
    return maps.sort((a, b) => b.votes - a.votes).slice(0, limit);
}

module.exports = {
    readMaps,
    saveMaps,
    addMap,
    getRandomMap,
    voteMap,
    getTopMaps
};
