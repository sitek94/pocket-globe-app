import { useState, useEffect } from 'react';
import { feature } from 'topojson';
import axios from 'axios';

export const useGeoJsonData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let _isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { data: topology } = await axios.get(
          'https://gist.githubusercontent.com/sitek94/5dfcc1335322c06131436c59b1219f7c/raw/countries-110m.json'
        );
        
        // Convert TopoJSON to GeoJSON
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
    }
  }, []);

  return [{ data, isLoading, isError }];
};
