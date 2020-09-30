import { useEffect, useState } from 'react';
import axios from 'axios';

export const useData = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [config, setConfig] = useState(null);
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

  return [{ data, isLoading, isError }, { setUrl, setConfig }]
}