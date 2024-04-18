import React, { useState } from 'react';
import { hexToRgb, hexToHsl } from '../../utils/colorUtils'; 

const ColorPicker = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    const rgbValue = hexToRgb(color);
    const hslValue = hexToHsl(color);
    onColorChange({ color: 'Selected Color', hex: color, rgb: rgbValue, hsl: hslValue });
  };

  console.log(selectedColor)
  return (
    <div>
      <input type="color" value={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
