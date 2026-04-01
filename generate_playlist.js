const { log } = require('console');
const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, 'music');
const bannerDir = path.join(__dirname, 'music_banner');
const scriptPath = path.join(__dirname, 'script.js');

// Helper to get song artist name
function getArtistName(filename) {
    let artist = filename.includes("-") ? filename.split(/-/g)[0] : "Unknown";
    return artist.replace(/_/g, ' ').trim();
}

// Helper to get song name
function getSongName(filename) {
    let name = filename.includes("-") ? filename.split(/-/g)[1] : filename;
    name = name.includes(".") ? name.split('.')[0] : name;
    return name.replace(/_/g, ' ').trim();
}

// Helper to get song image
function getSongBanner(songName) {
    let files = fs.readdirSync(bannerDir);
    const bannerPath = files.find( items => items.toLowerCase().includes(songName.toLowerCase()));
    return !!bannerPath ? bannerPath : "Music.png";
}

// Read music directory
fs.readdir(musicDir, (err, files) => {
    if (err) {
        console.error('Error reading music directory:', err);
        return;
    }

    const songs = files.filter(file => {
        let songs = file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".opus") || file.endsWith(".m4a");
        return songs;
    });

    const playlist = songs.map(file => {
        const baseName = path.basename(file);
        
        // Check if corresponding image exists
        const songName = getSongName(baseName);
        const songBanner = getSongBanner(songName);

        return {
            name: songName.replace(/_/g, ' '),
            artist: getArtistName(baseName), 
            banner: songBanner, 
            src: baseName
        };
    });

    const playlistString = `// [PLAYLIST_START]
let allMusic = ${JSON.stringify(playlist, null, 4)};
// [PLAYLIST_END]`;

    // Read script.js
    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading script.js:', err);
            return;
        }

        // Replace content between markers
        const regex = /\/\/ \[PLAYLIST_START\][\s\S]*?\/\/ \[PLAYLIST_END\]/;
        const updatedData = data.replace(regex, playlistString);

        // Write back to script.js
        fs.writeFile(scriptPath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to script.js:', err);
                return;
            }
            console.log('Playlist updated successfully!');
            console.log(`Added ${playlist.length} songs.`);
        });
    });
});
