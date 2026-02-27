const fs = require('fs');
const path = require('path');

const mapsFilePath = path.join(__dirname, '../../data/maps.json');

// Function to read maps
function readMaps() {
    try {
        if (!fs.existsSync(mapsFilePath)) {
            return [];
        }
        const data = fs.readFileSync(mapsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading maps:', error);
        return [];
    }
}

// Function to save maps
function saveMaps(maps) {
    try {
        const dir = path.dirname(mapsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(mapsFilePath, JSON.stringify(maps, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving maps:', error);
        return false;
    }
}

// Function to add a map
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

// Function to get a random map
function getRandomMap() {
    const maps = readMaps();
    if (maps.length === 0) return null;
    return maps[Math.floor(Math.random() * maps.length)];
}

// Function to vote for a map
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

// Function to get top maps
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
