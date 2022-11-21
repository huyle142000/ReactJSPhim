import React, { useState } from "react";

export default function Theme() {
  const [isLight, setTheme] = useState(true);

  return (
    <div className="change_theme">
      {isLight && (
        <button
          className="btn"
          onClick={() => {
            setTheme(!isLight);
            document.querySelector("body").classList.add("dark");
          }}
        >
          <i className="fa-solid fa-moon"></i>
        </button>
      )}
      {!isLight && (
        <button
          className="btn"
          onClick={() => {
            setTheme(!isLight);
            document.querySelector("body").classList.remove("dark");
          }}
        >
          <i className="fa-solid fa-sun"></i>
        </button>
      )}
    </div>
  );
}
