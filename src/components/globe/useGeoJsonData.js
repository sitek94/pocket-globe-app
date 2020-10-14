import { useState, useEffect } from 'react';
import { feature } from 'topojson';
import axios from 'axios';

export const useGeoJsonData = () => {
  const [data, setData] = useState({
    features: [],
    type: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let _isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { data: topology } = await axios.get(
          'https://gist.githubusercontent.com/sitek94/dff8b65aa26c9ba01d8f4217cf40587f/raw/topojson-countries-110m.json'
        );

        const geoJsonData = feature(topology, topology.objects.countries);

        if (_isMounted) setData(geoJsonData);
      } catch (error) {
        if (_isMounted) setIsError(error);
      }
      if (_isMounted) setIsLoading(false);
    };
    fetchData();

    return () => {
      _isMounted = false;
    };
  }, []);

  return [{ data, isLoading, isError }];
};
