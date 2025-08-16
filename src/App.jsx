import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AlbumPage from "./pages/AlbumPage";
import LikedSongs from "./pages/LikedSongs";
import BottomPlayerBar from "./components/BottomPlayerBar";
import { MusicProvider } from "./context/MusicContext";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // ✅ Updated Navbar with LanguageSwitch inside

// Language Context
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <MusicProvider>
      <LanguageProvider>
        <div style={{ minHeight: "100vh", paddingBottom: "80px", position: "relative" }}>
          
          {/* Fixed Navbar (now contains LanguageSwitch) */}
          <Navbar />

          {/* Main content with padding so it doesn't hide behind Navbar */}
          <div style={{ paddingTop: "56px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/album/:albumId" element={<AlbumPage />} />
              <Route path="/liked" element={<LikedSongs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          {/* Fixed Bottom Player Bar */}
          <BottomPlayerBar />

          {/* Footer */}
          <Footer />
        </div>
      </LanguageProvider>
    </MusicProvider>
  );
}
