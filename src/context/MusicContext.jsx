// src/context/MusicContext.jsx
import React, { createContext, useState, useRef, useEffect } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  // Web Audio API for visualization
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  // Player states
  const [currentSong, setCurrentSong] = useState(() => {
    const savedSong = localStorage.getItem("lastPlayedSong");
    return savedSong ? JSON.parse(savedSong) : null;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem("playerVolume")) || 1;
  });

  // Extra controls
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Likes & Playlists
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : {};
  });

  // Current queue for next/previous
  const [currentQueue, setCurrentQueue] = useState([]);

  // Visualization data
  const [waveformData, setWaveformData] = useState(new Uint8Array(0));

  // 🎯 Recently Played
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  });

  // Save recentlyPlayed to localStorage
  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Setup Audio Analyser Node for waveform
  const setupVisualizer = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256; // resolution of the data
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    }
  };

  // Capture waveform data
  const updateWaveform = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      setWaveformData(new Uint8Array(dataArrayRef.current));
    }
    requestAnimationFrame(updateWaveform);
  };

  // Play song
  const playSong = (song, queue = []) => {
    if (!song || !song.url) return;

    audioRef.current.src = song.url;
    audioRef.current.play();
    setCurrentSong(song);
    setIsPlaying(true);

    if (queue.length > 0) {
      setCurrentQueue(queue);
    }

    localStorage.setItem("lastPlayedSong", JSON.stringify(song));

    // 🎯 Add to Recently Played (avoid duplicates, keep max 10)
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.url !== song.url);
      const updated = [song, ...filtered];
      return updated.slice(0, 10);
    });

    setupVisualizer();
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    updateWaveform();
  };

  // Pause
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Seek
  const seekSong = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // Volume
  const changeVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value;
    localStorage.setItem("playerVolume", value);
  };

  // Like / Unlike
  const toggleLike = (song) => {
    let updated;
    if (likedSongs.some((s) => s.url === song.url)) {
      updated = likedSongs.filter((s) => s.url !== song.url);
    } else {
      updated = [...likedSongs, song];
    }
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  // Playlist management
  const addToPlaylist = (playlistName, song) => {
    const updatedPlaylists = { ...playlists };
    if (!updatedPlaylists[playlistName]) {
      updatedPlaylists[playlistName] = [];
    }
    if (!updatedPlaylists[playlistName].some((s) => s.url === song.url)) {
      updatedPlaylists[playlistName].push(song);
    }
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const removeFromPlaylist = (playlistName, songUrl) => {
    const updatedPlaylists = { ...playlists };
    if (updatedPlaylists[playlistName]) {
      updatedPlaylists[playlistName] = updatedPlaylists[playlistName].filter(
        (s) => s.url !== songUrl
      );
    }
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  // Shuffle
  const toggleShuffle = () => setShuffle((prev) => !prev);

  // Repeat
  const toggleRepeat = () => setRepeat((prev) => !prev);

  // Play next
  const playNext = () => {
    if (!currentSong || currentQueue.length === 0) return;

    const currentIndex = currentQueue.findIndex(s => s.url === currentSong.url);
    let nextIndex;

    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * currentQueue.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1) % currentQueue.length;
    }

    playSong(currentQueue[nextIndex]);
  };

  // Play previous
  const playPrevious = () => {
    if (!currentSong || currentQueue.length === 0) return;

    const currentIndex = currentQueue.findIndex(s => s.url === currentSong.url);
    let prevIndex;

    if (shuffle) {
      do {
        prevIndex = Math.floor(Math.random() * currentQueue.length);
      } while (prevIndex === currentIndex);
    } else {
      prevIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
    }

    playSong(currentQueue[prevIndex]);
  };

  // Player events
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    audio.volume = volume;

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeat, shuffle, volume, currentQueue, currentSong]);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        progress,
        duration,
        seekSong,
        volume,
        changeVolume,
        likedSongs,
        toggleLike,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        shuffle,
        toggleShuffle,
        repeat,
        toggleRepeat,
        playNext,
        playPrevious,
        waveformData,
        recentlyPlayed // 🎯 expose recently played list
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
