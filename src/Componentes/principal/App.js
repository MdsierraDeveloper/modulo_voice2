import React, { useState, useEffect } from "react";
import "./App.css";
import "./Chat.css";
import logo from "./Logo.png";
import Chatbot from "./Chat";

const App = () => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("highContrast") === "true";
  });

  const [fontScale, setFontScale] = useState(() => {
    return parseFloat(localStorage.getItem("fontScale")) || 1;
  });

  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("highContrast", highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale);
    localStorage.setItem("fontScale", fontScale.toString());
  }, [fontScale]);

  const handleContrastToggle = () => {
    setHighContrast((prev) => !prev);
  };

  const handleFontResize = () => {
    setFontScale((prev) => (prev < 1.5 ? prev + 0.1 : 1));
  };

  return (
    <>
      <header className="custom-header">
        <div className="left-section">{/* Placeholder opcional */}</div>

        <div className="center-section">
          <img src={logo} alt="Logo central" className="center-logo" />
          <div className="logo-text">GIDSYC</div>
        </div>

        <div className="right-section">
          <button className="text-resize-button" onClick={handleFontResize}>
            A+
          </button>
          <label className="switch">
            <input
              type="checkbox"
              id="contrast-toggle"
              checked={highContrast}
              onChange={handleContrastToggle}
            />
            <span className="slider"></span>
          </label>
        </div>
      </header>

      <main>
        {!showChatbot && (
          <button
            className="access-chatbot-button"
            onClick={() => setShowChatbot(true)}
          >
            Abrir Chatbot
          </button>
        )}
        {showChatbot && (
          <div className="chatbot-modal">
            <Chatbot onClose={() => setShowChatbot(false)} />
          </div>
        )}

      </main>
    </>
  );
};

export default App;
