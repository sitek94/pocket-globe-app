import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const topologyUrl = {
  high: 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json',
  low: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
}

const isoCodesUrl = 'https://gist.githubusercontent.com/sitek94/4339d86883340aac67cf61a5ed7bb05e/raw/00e0fe120a79a29758634cd2416a2e9893895cde/ISO-3166-Countries-with-Regional-Codes.json';

export const useData = ({ resolution }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      /**
       * Because topojson data provides only numeric ISO 3166 codes,
       * additionaly I fetch more iso codes data, so I can extend each country object
       * with ISO 3166 alpha-3 code.
       * 
       * This will be useful when fetching more data about each country.
       */
      json(topologyUrl[resolution]),
      json(isoCodesUrl)
    ])
    .then(([topology, isoCodes]) => {
      
      // Convert TopoJSON to GeoJSON - creates feature collection 
      const featureCollection = feature(topology, topology.objects.countries);

      // Extend properties of each feature
      featureCollection.features.forEach(feature => {
        // Some countries in the collection don't have an id
        if (feature.id) {
          const isoCodeObj = isoCodes.find(country => country['country-code'] === feature.id);
          feature.properties = {
            name: isoCodeObj.name,
            alphaCode: isoCodeObj['alpha-3'],
            numericCode: isoCodeObj['country-code']
          }
          console.log(isoCodeObj.name)
        }
      })

      setData(featureCollection);
    })
  }, [resolution]);

  return data;
}