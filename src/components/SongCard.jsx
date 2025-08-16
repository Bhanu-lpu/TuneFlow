import React from "react";
import { FaPlay, FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";

export default function SongCard({
  song,
  isPlaying,
  onPlay,
  isLiked,
  onLike,
  onAddToPlaylist, // optional callback for adding to playlist
}) {
  return (
    <div className="song-card" tabIndex={0} aria-label={`Song: ${song.title}`}>
      <img
        src={song.poster || "https://via.placeholder.com/150"}
        alt={song.title}
        className="song-poster"
      />
      <h3 className="song-title">{song.title}</h3>

      <div className="song-actions">
        <button
          onClick={onPlay}
          className="play-btn"
          title={isPlaying ? "Playing" : "Play"}
          aria-pressed={isPlaying}
        >
          <FaPlay color={isPlaying ? "lime" : "white"} />
        </button>

        <button
          onClick={onLike}
          className="like-btn"
          title={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
        >
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
        </button>

        {/* Optional: Add to playlist button */}
        {onAddToPlaylist && (
          <button
            onClick={onAddToPlaylist}
            className="add-playlist-btn"
            title="Add to Playlist"
            aria-label={`Add ${song.title} to playlist`}
          >
            <FaPlus color="white" />
          </button>
        )}
      </div>
    </div>
  );
}
