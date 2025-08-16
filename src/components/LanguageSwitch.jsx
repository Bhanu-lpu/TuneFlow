import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={() => setLanguage(language === "telugu" ? "hindi" : "telugu")}
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        backgroundColor: "#1DB954",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: 20,
        cursor: "pointer",
        zIndex: 9999,
      }}
      title="Switch Language"
    >
      {language === "telugu" ? "हिंदी" : "తెలుగు"}
    </button>
  );
};

export default LanguageSwitch;
