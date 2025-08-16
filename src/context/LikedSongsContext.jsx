import React, { createContext, useContext, useState, useEffect } from "react";

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    const stored = localStorage.getItem("likedSongs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some((s) => s.url === song.url);
      if (isLiked) {
        return prev.filter((s) => s.url !== song.url);
      }
      return [...prev, song];
    });
  };

  const isLiked = (songUrl) => likedSongs.some((s) => s.url === songUrl);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike, isLiked }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => useContext(LikedSongsContext);
