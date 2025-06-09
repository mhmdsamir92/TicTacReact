import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={currentName}
            onChange={(event) => setCurrentName(event.target.value)}
          />
        ) : (
          <span className="player-name">{currentName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
