/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ['React', 'vue', 'angular'];
  return (
    <div>
      <div className="dropdown">
        <button type="button" className="dropdown-button" onClick={(e) => setIsActive(!isActive)}>
          Choose One
          <span className="fas fa-caret-down" />
        </button>
        {isActive && (
          <div className="dropdown-content">
            {options.map((option) => (
              <button
                type="button"
                className="dropdown-item"
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Dropdown;
