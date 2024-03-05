import React, { createContext, useState, useEffect } from 'react';

const GitHubDataContext = createContext({});

export const GitHubDataProvider = ({ children }) => {
  

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/madhusriram012/Atlan-frontend/main/ModelsData.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <GitHubDataContext.Provider value={{ data , isLoading, error }}>
      {children}
    </GitHubDataContext.Provider>
  );
};

export default GitHubDataContext;
