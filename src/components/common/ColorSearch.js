import React, { useState, useEffect } from "react";
import ColorTable from "../elements/ColorTable";
import { hexToRgb, hexToHsl } from "../../utils/colorUtils";
import { getColorData } from "../../service/colorService";
import SearchInput from "../elements/SearchInput";
import ColorPicker from "../elements/ColorPicker";
import ExampleComponent from "./ExampleComponent";

const ColorSearch = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredColors, setFilteredColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (colorData) => {
    setSelectedColor(colorData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorsData = await getColorData();

        const colorsWithRgbAndHsl = colorsData.map((color) => ({
          ...color,
          rgb: hexToRgb(color.hex),
          hsl: hexToHsl(color.hex),
        }));

        setColors(colorsWithRgbAndHsl);
        setFilteredColors(colorsWithRgbAndHsl);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch color data");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  const handleFilter = (filteredData) => {
    setFilteredColors(filteredData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("seleted color", selectedColor);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-start">Color Search Tool</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-sm rounded-md">
        <div className="bg-white flex flex-col justify-center  rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Search Colors</h2>
          <SearchInput data={colors} onFilter={handleFilter} />
        </div>
        <div className="flex flex-col justify-center lg:items-end bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Select Color</h2>
          <ColorPicker onColorChange={handleColorChange} />
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Color Details</h2>

        <ColorTable colors={filteredColors} selectedColor={selectedColor} />
      </div>
    </div>
  );
};

export default ColorSearch;
//working code
