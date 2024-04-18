
import React, { createContext, useState, useContext, useEffect } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messages.length > 0) {
        setMessages(messages.slice(1)); 
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [messages]);

  const showMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <div className="message-container z-20">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
