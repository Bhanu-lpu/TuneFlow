import React, { useState, useEffect, useContext } from "react";
import folders from "../data/folders";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/home.css";
import { LanguageContext } from "../context/LanguageContext";

const MOVIES_PER_PAGE = 5;

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Get current language from context
  const { language } = useContext(LanguageContext);

  // Highlight matched text
  const highlightMatch = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <mark key={idx} style={{ backgroundColor: "#ffeb3b" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filter folders based on search AND language
  const filteredFolders = folders
    .filter((folder) => folder.language === language) // filter by language first
    .filter((folder) => {
      const folderMatch = folder.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const songMatch = folder.songs.some((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return folderMatch || songMatch;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFolders.length / MOVIES_PER_PAGE);
  const indexOfLastFolder = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstFolder = indexOfLastFolder - MOVIES_PER_PAGE;
  const currentFolders = filteredFolders.slice(
    indexOfFirstFolder,
    indexOfLastFolder
  );

  const handleFolderClick = (folderTitle) => {
    navigate(`/album/${encodeURIComponent(folderTitle)}`);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, language]); // reset page when language changes too

  return (
    <div className="home-page">
      {/* Top banner image */}
      <div className="text-center">
        <img
          src="/banner.png" // <-- replace with your image name in /public
          alt="TuneFlow Banner"
          className="mx-auto w-64 sm:w-80 md:w-96 rounded-lg shadow-lg"
        />
        <p className="mt-2 text-lg font-semibold">
          {language.toUpperCase()} SONGS
        </p>
      </div>

      {/* Liked Songs button */}
      <Link to="/liked" className="liked-link">
        ❤️ Liked Songs
      </Link>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search movies or songs…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* Albums grid */}
      <div className="albums-grid">
        {currentFolders.length > 0 ? (
          currentFolders.map((folder) => (
            <div
              key={folder.title}
              className="album-card"
              onClick={() => handleFolderClick(folder.title)}
            >
              <img
                src={folder.image}
                alt={folder.title}
                className="album-image"
              />
              <p className="album-name">{highlightMatch(folder.title)}</p>

              {/* Show matching songs if searching */}
              {searchQuery && (
                <ul className="matching-songs">
                  {folder.songs
                    .filter((song) =>
                      song.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((song, idx) => (
                      <li
                        key={idx}
                        style={{ fontSize: "0.9rem", color: "#ccc" }}
                      >
                        {highlightMatch(song.title)}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No results found for “{searchQuery}”.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="clear-btn"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination flex justify-center mt-6 space-x-2 sm:space-x-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Prev
          </button>

          {(() => {
            const pageNumbers = [];
            const maxVisible = 5;
            let startPage =
              Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
            let endPage = Math.min(
              startPage + maxVisible - 1,
              totalPages
            );

            for (let page = startPage; page <= endPage; page++) {
              pageNumbers.push(
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`pagination-btn ${
                    page === currentPage ? "font-bold underline" : ""
                  }`}
                >
                  {page}
                </button>
              );
            }
            return pageNumbers;
          })()}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
