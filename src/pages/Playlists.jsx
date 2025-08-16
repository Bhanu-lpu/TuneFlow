// Playlists.jsx - shows all playlists
import React from 'react';
import { Link } from 'react-router-dom';

export default function Playlists({ playlists }) {
  return (
    <div>
      <h1>Your Playlists</h1>
      <ul>
        {playlists.map((pl) => (
          <li key={pl.id}>
            <Link to={`/playlist/${pl.id}`}>{pl.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
