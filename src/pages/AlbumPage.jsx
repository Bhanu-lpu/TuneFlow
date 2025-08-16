import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import folders from "../data/folders";
import SongCard from "../components/SongCard";
import "../Styles/album.css";
import { MusicContext } from "../context/MusicContext";

export default function AlbumPage() {
  const { albumId } = useParams();

  // Normalize string for matching
  const normalize = (str) =>
    str.toLowerCase().replace(/\s+/g, " ").trim();

  // Decode the albumId from URL
  const decodedAlbumId = decodeURIComponent(albumId || "");

  // Find album by normalized title
  const album = folders.find(
    (folder) => normalize(folder.title) === normalize(decodedAlbumId)
  );

  // DEBUGGING — logs inside component
  console.log("albumId param:", albumId);
  console.log("decodedAlbumId:", decodedAlbumId);
  console.log("Normalized albumId:", normalize(decodedAlbumId));
  console.log("All normalized titles:", folders.map((f) => normalize(f.title)));
  console.log("Matched album:", album);

  const { currentSong, playSong, likedSongs, toggleLike } =
    useContext(MusicContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (album) {
      setSongs(
        album.songs.map((song) => ({
          title: song.title,
          url: song.url || `/songs/${song.file}`,
          poster: album.image,
        }))
      );
    }
  }, [album]);

  if (!album) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Album not found</h2>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          ⬅ Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="album-page p-6 text-white">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ⬅ Back to Home
        </Link>
      </div>

      <div className="album-header flex items-center gap-6 mb-6">
        <img
          src={album.image}
          alt={album.title}
          className="album-poster w-40 h-40 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="album-title text-3xl font-bold">{album.title}</h1>
          {album.description && (
            <p className="album-description text-gray-300">{album.description}</p>
          )}
        </div>
      </div>

      <div className="songs-grid grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <SongCard
              key={index}
              song={song}
              isPlaying={currentSong?.url === song.url}
              onPlay={() => playSong(song, songs)}
              isLiked={likedSongs.some((s) => s.url === song.url)}
              onLike={() => toggleLike(song)}
            />
          ))
        ) : (
          <p className="text-gray-400">No songs available in this album.</p>
        )}
      </div>
    </div>
  );
}
