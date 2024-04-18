import React, { useEffect, useState } from 'react';
import { useMessage } from '../common/MessageContextProvider';
import CopyButton from './CopyButton';
import Loader from '../common/Loader';

const ColorTable = ({ colors, selectedColor }) => {
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessage();

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {loading ? (
        <Loader /> 
      ) : (

        <div className="max-h-screen overflow-y-scroll custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hex Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              RGB
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              HSL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {selectedColor && (
            <tr key={selectedColor.hex} className=''>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center ">
                    <CopyButton text={selectedColor.color} onClick={() => showMessage('Copied Color Name!')} />
                  {selectedColor.color}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={selectedColor.hex} onClick={() => showMessage('Copied Hex Code!')} />
                  {selectedColor.hex}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={selectedColor.rgb} onClick={() => showMessage('Copied RGB!')} />
                  {selectedColor.rgb}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={selectedColor.hsl} onClick={() => showMessage('Copied HSL!')} />
                  {selectedColor.hsl}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedColor.hex }}></div>
              </td>
            </tr>
          )}
          {colors.map((color) => (
            <tr key={color.hex}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={color.color} onClick={() => showMessage('Copied Name!')} />
                  {color.color}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={color.hex} onClick={() => showMessage('Copied Hex Code!')} />
                  {color.hex}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                   <CopyButton text={color.rgb} onClick={() => showMessage('Copied RGB!')} />
                  {color.rgb}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <CopyButton text={color.hsl} onClick={() => showMessage('Copied HSL!')} />
                  {color.hsl}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hex }}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
        )}
        
    </div>
  );
};

export default ColorTable;
