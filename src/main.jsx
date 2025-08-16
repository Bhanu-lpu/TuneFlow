import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./Styles/global.css";
import { LikedSongsProvider } from "./context/LikedSongsContext";
import { MusicProvider } from "./context/MusicContext"; // ✅ now matches


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicProvider>
        <LikedSongsProvider>
          <App />
        </LikedSongsProvider>
      </MusicProvider>
    </BrowserRouter>
  </React.StrictMode>
);
