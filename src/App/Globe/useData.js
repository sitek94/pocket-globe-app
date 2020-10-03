import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const topologyUrl = {
  high: 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json',
  low: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
}

const isoCodesUrl = 'https://gist.githubusercontent.com/sitek94/4339d86883340aac67cf61a5ed7bb05e/raw/ISO-3166-Countries-with-Regional-Codes.json';

export const useData = ({ resolution }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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

      // Convert TopoJSON to GeoJSON 
      const countriesGeoJSON = feature(topology, topology.objects.countries);

      // Extend properties of each feature with ISO CODES
      countriesGeoJSON.features.forEach(feature => {
        // Some countries in the collection don't have an id
        if (feature.id) {
          const isoCodeObj = isoCodes.find(country => country['country-code'] === feature.id);
          feature.properties = {
            name: isoCodeObj.name,
            alphaCode: isoCodeObj['alpha-3'],
            numericCode: isoCodeObj['country-code']
          }
        }
      })

      setData(countriesGeoJSON);
    })
    .catch(setIsError);

    setIsLoading(false);
  }, [resolution]);

  return [{ data, isLoading, isError }];
}