import React from "react";

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm">
      <span className="text-gray-500">☀️</span>
      <input
        type="checkbox"
        className="toggle toggle-sm"
        checked={theme === "dark"}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span className="text-gray-500">🌙</span>
    </label>
  );
};

export default ThemeToggle;
