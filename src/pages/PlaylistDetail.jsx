import React from "react";
import { useParams } from "react-router-dom";

export default function PlaylistDetail({ playlists }) {
  const { id } = useParams();

  if (!playlists) {
    return <p>Loading playlists...</p>; // or null or spinner
  }

  const playlist = playlists.find(pl => pl.id === id);

  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  return (
    <div>
      <h1>{playlist.title}</h1>
      <ul>
        {playlist.songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
}
