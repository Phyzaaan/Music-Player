const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, 'music');
const bannerDir = path.join(__dirname, 'music_banner');
const scriptPath = path.join(__dirname, 'script.js');

// Helper to get song artist name
function getArtistName(filename) {
    let artist = filename.split(/-/g)[1];
    artist = artist ? artist.split(".")[0] : "Unknown";
    return artist.replace(/_/g, ' ').trim();
}

// Helper to get song name
function getSongName(filename) {
    let name = filename.split(/-/g)[0];
    name = name.includes('.') ? name.split('.')[0] : name;
    return name;
}

// Read music directory
fs.readdir(musicDir, (err, files) => {
    if (err) {
        console.error('Error reading music directory:', err);
        return;
    }

    const songs = files.filter(file => {
        let mp3 = file.endsWith('.mp3'); 
        return mp3 ? mp3 : file.endsWith('.m4a');
    });

    const playlist = songs.map(file => {
        const baseName = path.basename(file);
        
        // Check if corresponding image exists
        const songName = getSongName(baseName);
        const imgPath = path.join(bannerDir, `${songName}.png`);

        const hasImg = fs.existsSync(imgPath);

        return {
            name: songName.replace(/_/g, ' '),
            artist: getArtistName(baseName), 
            img: hasImg ? songName : "music", 
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
