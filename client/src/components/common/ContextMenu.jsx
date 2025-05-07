import React, { useEffect, useRef } from "react";

function ContextMenu({ options, cordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      setContextMenu(false);
    }
  };

  useEffect(() => {
    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  return (
    <div
      ref={contextMenuRef}
      className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl`}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            className="px-5 py-2 cursor-pointer hover:bg-background-default-hover"
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
