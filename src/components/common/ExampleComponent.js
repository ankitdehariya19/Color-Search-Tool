import React from 'react';
import { useMessage } from './MessageContextProvider';

const ExampleComponent = () => {
  const { showMessage } = useMessage();

  const handleShowMessage = () => {
    showMessage('Hello from MessageContext!');
  };

  return (
    <div className='w-fit h-fit bg-red-500'>
      <button onClick={handleShowMessage}>Show Message</button>
    </div>
  );
};

export default ExampleComponent;
