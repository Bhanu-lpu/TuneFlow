// src/context/PlaylistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  // Load playlists from localStorage or start empty
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist playlists to localStorage on change
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Create a new playlist with a unique id and name
  const createPlaylist = (name) => {
    if (!name.trim()) return false;
    if (playlists.some((p) => p.name === name)) return false; // no duplicates
    setPlaylists((prev) => [...prev, { id: Date.now(), name, songs: [] }]);
    return true;
  };

  // Add a song to a playlist by playlist id
  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          // Avoid duplicate songs
          if (playlist.songs.some((s) => s.url === song.url)) return playlist;
          return { ...playlist, songs: [...playlist.songs, song] };
        }
        return playlist;
      })
    );
  };

  // Remove a song from a playlist by playlist id and song url
  const removeSongFromPlaylist = (playlistId, songUrl) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((s) => s.url !== songUrl),
          };
        }
        return playlist;
      })
    );
  };

  // Delete a playlist by id
  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
