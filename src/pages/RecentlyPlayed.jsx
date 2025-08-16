// src/pages/RecentlyPlayed.jsx
import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import SongCard from "../components/SongCard";

export default function RecentlyPlayed() {
  const { recentlyPlayed, playSong, currentSong, isPlaying, toggleLike, likedSongs } =
    useContext(MusicContext);

  if (!recentlyPlayed || recentlyPlayed.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No songs played recently.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recently Played</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...recentlyPlayed].reverse().map((song, index) => (
          <SongCard
            key={index}
            song={song}
            isPlaying={currentSong?.url === song.url && isPlaying}
            onPlay={() => playSong(song)}
            isLiked={likedSongs.some((liked) => liked.url === song.url)}
            onLike={() => toggleLike(song)}
          />
        ))}
      </div>
    </div>
  );
}
