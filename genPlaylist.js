const { log } = require("console");
const fs = require("fs");
const path = require("path");

const songsDir = path.join(__dirname, "songs");
const bannerDir = path.join(__dirname, "songs_banner");
const scriptPath = path.join(__dirname, "script.js");

// Helper to get song artist name
function getArtistName(filename) {
  let artist = filename.includes("-")
    ? filename.split(/-/g).slice(0, -1).join("-")
    : "Unknown";
  return artist.replace(/_/g, " ").trim();
}

// Helper to get song name
function getSongName(filename) {
  let name = filename.includes("-")
    ? filename.split(/-/g).slice(-1)[0]
    : filename;
  name = name.includes(".") ? name.split(".").slice(0, -1).join(".") : name;
  return name.replace(/_/g, " ").trim();
}

// Helper to get song image
function getSongBanner(songName) {
  let files = fs.readdirSync(bannerDir);
  let path = files.find(
    (items) =>
      items.split(".").slice(0, -1).join(".").toLowerCase() ==
      songName.toLowerCase(),
  );
  return !!path ? path : "Music.png";
}

// Read songs directory
fs.readdir(songsDir, (err, files) => {
  if (err) {
    console.error("Error reading songs directory:", err);
    return;
  }

  const songs = files.filter((file) => {
    let song =
      file.endsWith(".mp3") ||
      file.endsWith(".wav") ||
      file.endsWith(".opus") ||
      file.endsWith(".m4a");
    return song;
  });

  const playlist = songs.map((file) => {
    const baseName = path.basename(file);

    // Check if corresponding image exists
    const songName = getSongName(baseName);
    const songBanner = getSongBanner(songName);

    return {
      name: songName.replace(/_/g, " "),
      artist: getArtistName(baseName),
      banner: songBanner,
      src: baseName,
    };
  });

  const playlistString = `// [PLAYLIST_START]
let allSongs = ${JSON.stringify(playlist, null, 4)};
// [PLAYLIST_END]`;

  // Read script.js
  fs.readFile(scriptPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading script.js:", err);
      return;
    }

    // Replace content between markers
    const regex = /\/\/ \[PLAYLIST_START\][\s\S]*?\/\/ \[PLAYLIST_END\]/;
    const updatedData = data.replace(regex, playlistString);

    // Write back to script.js
    fs.writeFile(scriptPath, updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to script.js:", err);
        return;
      }
      console.log("Playlist updated successfully!");
      console.log(`Added ${playlist.length} song.`);
    });
  });
});
