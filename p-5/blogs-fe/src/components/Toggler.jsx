import { useState, useImperativeHandle } from 'react'

const Toggler = ({ buttonLabel, children, ref }) => {
  const [isActive, setIsActive] = useState(false);

  const inactiveStyle = { display: isActive ? 'none' : '' };
  const activeStyle = { display: isActive ? '' : 'none' };

  const toggleVisibility = () => {
    setIsActive(!isActive);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={inactiveStyle}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={activeStyle}>
        {children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Toggler;