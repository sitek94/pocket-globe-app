import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isErorr: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useDataApi = ({
  initialData,
  initialUrl = null,
  initialConfig = {},
  axiosInstance = axios,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [config, setConfig] = useState(initialConfig);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });

      try {
        const result = await axiosInstance.get(url, config);

        if (!didCancel) {
          dispatch({ type: FETCH_SUCCESS, payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_FAILURE });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, config, axiosInstance]);

  return [state, { setUrl, setConfig }];
};
