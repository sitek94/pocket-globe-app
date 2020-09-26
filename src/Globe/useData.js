import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl =
  'https://gist.githubusercontent.com/sitek94/5dfcc1335322c06131436c59b1219f7c/raw/cc887eae01db017d300560609342921093f87130/countries-110m.json';

export const useData = () => {
  const [data, setData] = useState(null);

 
  console.log(data);
  useEffect(() => {
    json(jsonUrl)
    .then(topology => {
      const { countries } = topology.objects;
      setData(feature(topology, countries)
        // interiors: mesh(topology, countries, (a, b) => a !== b)
     );
    });
  }, []);

  return data;
}