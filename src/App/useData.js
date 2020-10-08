import { useEffect, useState } from 'react';
import axios from 'axios';

export const useData = (initialUrl, initialData, config = {}) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(url, config);
        setData(result.data)

      } catch (error) {
        
        setIsError(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url, config]);

  return [{ data, isLoading, isError }, setUrl]
}