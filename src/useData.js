import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl =
  'https://raw.githubusercontent.com/michael-keith/mps_interests/master/view/js/charts/data/world_map.json';

export const useData = () => {
  const [data, setData] = useState(null);

 
  console.log(data);
  useEffect(() => {
    json(jsonUrl)
      .then(setData);
    
  }, []);

  return data;
}