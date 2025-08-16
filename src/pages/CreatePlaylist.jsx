import React, { useState } from "react";
import { useMusic } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const [name, setName] = useState("");
  const { createPlaylist } = useMusic();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const success = createPlaylist(name.trim());
    if (success) {
      navigate(`/playlist/${encodeURIComponent(name.trim())}`);
    } else {
      setError("Playlist with this name already exists.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Create New Playlist</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreatePlaylist;
