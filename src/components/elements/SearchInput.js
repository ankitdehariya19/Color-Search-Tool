import React, { useEffect, useState } from "react";
import { useMessage } from '../common/MessageContextProvider'; 

const calculateColorDistance = (color1, color2) => {
  const rDiff = color1.r - color2.r;
  const gDiff = color1.g - color2.g;
  const bDiff = color1.b - color2.b;
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

const findSimilarColors = (userColor, colorDataset) => {
  const similarColors = [];

  colorDataset.forEach((color) => {
    const colorDist = calculateColorDistance(userColor.rgb, color.rgb);
    similarColors.push({ ...color, distance: colorDist });
  });

  similarColors.sort((a, b) => a.distance - b.distance);

  return similarColors.slice(0, 100);
};

const SearchInput = ({ data, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [similarColors, setSimilarColors] = useState([]);
  const { showMessage } = useMessage();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);


    if (typingTimeout) {
      clearTimeout(typingTimeout); 
    }

      const newTimeout = setTimeout(() => {
        if (value.trim() !== '') {
        const filteredData = data.filter(
          (item) =>
            item.color.toLowerCase().includes(value.toLowerCase()) ||
            item.hex.toLowerCase().includes(value.toLowerCase()) ||
            item.rgb.toLowerCase().includes(value.toLowerCase()) ||
            item.hsl.toLowerCase().includes(value.toLowerCase())
        );
        const userColor = { name: value, rgb: { r: 0, g: 0, b: 0 } }; 
        const similarColors = findSimilarColors(userColor, data);
  
        if (filteredData.length === 0) {
          showMessage('No matching color found.');
        } else if (similarColors.length > 0) {
          showMessage('Similar colors found.');
        }
        onFilter(filteredData)
        setSimilarColors(similarColors); 
       ; 
      }else {
        onFilter(data); 
      }
      }, 2000); 
  
      setTypingTimeout(newTimeout); 
    };
  
    useEffect(() => {
      return () => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
      };
    }, [typingTimeout, searchTerm]);


  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name, hex code, RGB, or HSL"
        className="p-2 border border-gray-300 rounded-md mb-4"
      />
     
    </div>
  );
};

export default SearchInput;

