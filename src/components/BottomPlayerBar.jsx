import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedoAlt,
  FaVolumeUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const BottomPlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
    progress,
    duration,
    seekSong,
    volume,
    changeVolume,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    likedSongs,
    toggleLike,
    playNext,
    playPrevious,
  } = useContext(MusicContext);

  if (!currentSong) return null;

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isLiked = likedSongs.some((s) => s.url === currentSong.url);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(18,18,18,0.95)",
        color: "white",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        zIndex: 9999,
        borderTop: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Song Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {currentSong.cover && (
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: "bold", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentSong.title}
          </div>
          {currentSong.artist && (
            <div style={{ fontSize: 12, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentSong.artist}
            </div>
          )}
        </div>
        <button
          onClick={() => toggleLike(currentSong)}
          title={isLiked ? "Unlike" : "Like"}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: isLiked ? "#1DB954" : "white",
          }}
        >
          {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        </button>
      </div>

      {/* Controls + Progress + Volume */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", // ✅ allows volume to move to next line on small screens
          gap: 8,
        }}
      >
        {/* Left Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={toggleShuffle}
            title="Shuffle"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: shuffle ? "#1DB954" : "white",
            }}
          >
            <FaRandom size={18} />
          </button>

          <button
            onClick={playPrevious}
            title="Previous"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            <FaStepBackward size={20} />
          </button>

          {isPlaying ? (
            <button
              onClick={pauseSong}
              title="Pause"
              style={{
                background: "#1DB954",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaPause size={16} color="white" />
            </button>
          ) : (
            <button
              onClick={() => playSong(currentSong)}
              title="Play"
              style={{
                background: "#1DB954",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaPlay size={16} color="white" />
            </button>
          )}

          <button
            onClick={playNext}
            title="Next"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            <FaStepForward size={20} />
          </button>

          <button
            onClick={toggleRepeat}
            title="Repeat"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: repeat ? "#1DB954" : "white",
            }}
          >
            <FaRedoAlt size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flex: 1,
            minWidth: 140,
            maxWidth: 400,
          }}
        >
          <span style={{ fontSize: 12 }}>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seekSong(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 12 }}>{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            minWidth: 100, // ✅ ensures it won’t collapse
          }}
        >
          <FaVolumeUp size={18} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            style={{
              flex: 1,
              minWidth: 60, // ✅ smaller on mobile but always visible
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomPlayerBar;
