import React, { useContext } from "react";
import { useLikedSongs } from "../context/LikedSongsContext";  // Your liked songs context
import { MusicContext } from "../context/MusicContext"; // Import MusicContext here
import SongCard from "../components/SongCard";
import { Link } from "react-router-dom";
const LikedSongs = () => {
  const { likedSongs } = useLikedSongs();

  // Get currentSong, isPlaying, playSong, toggleLike from MusicContext
  const { currentSong, isPlaying, playSong, toggleLike } = useContext(MusicContext);

  return (
    <div className="p-6 text-white">
       <Link to="/" className="text-blue-400 underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-4">Liked Songs</h1>
      {likedSongs.length === 0 ? (
        <p>No liked songs yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {likedSongs.map((song, index) => (
            <SongCard
              key={index}
              song={song}
              isPlaying={currentSong?.url === song.url && isPlaying}
              onPlay={() => playSong(song, likedSongs)}
              isLiked={true} // since these are liked songs
              onLike={() => toggleLike(song)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
