import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = {
  high: 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json',
  low: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
}

export const useData = ({ resolution }) => {
  const [data, setData] = useState(null);

 
  console.log(data);
  useEffect(() => {
    json(jsonUrl[resolution])
    .then(topology => {
      const { countries } = topology.objects;
      setData(feature(topology, countries)
        // interiors: mesh(topology, countries, (a, b) => a !== b)
     );
    });
  }, []);

  return data;
}