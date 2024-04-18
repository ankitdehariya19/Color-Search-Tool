import React from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

const CopyButton = ({ text, onClick }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    onClick(); 
  };

  return (
    <button
      className="flex items-center justify-center rounded-full p-2 bg-gray-100 text-gray-400 hover:text-gray-500 hover:bg-gray-200 mr-2 "
      onClick={handleCopy}
    >
      <MdOutlineContentCopy />
    </button>
  );
};

export default CopyButton;
