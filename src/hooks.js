import {useState, useMemo, useRef, useEffect} from 'react';
import axios from 'axios';

export const usePrevious = (val) => {
  const r = useRef();
  useEffect(() => {
    r.current = val;
  });
  return r.current;
};

export const useAxios = (url, method, timeout = 500) => {
  const api = useMemo(() => {
    return axios.create({
      baseURL: url
    })
  }, []);

  const [states, setStates] = useState({
    loading: false,
    response: {},
    error: null,
    status: 1,
    request: {},
  });

  const prevStatus = usePrevious(states.status);

  function callApi(data, headers = null) {
    let a = null;
    const defaultHeader = headers || {
      'Content-Type': 'application/json'
    };
    const _headers = headers
      ? {
          ...defaultHeader,
          ...headers,
        }
      : defaultHeader;
    switch (method) {
      case 'get':
        a = api.get(url, {
          params: data,
          headers: _headers,
        });
        break;
      case 'post':
        a = api.post(url, data, {
          headers: _headers,
        });
        break;
      default:
    }
    setStates({
      ...states,
      loading: true,
      status: -1,
      request: data
    });
    return new Promise((resolve, reject) => {
      a.then((r) => {
        setTimeout(() => {
          setStates({
            ...states,
            loading: false,
            response: r.data,
            status: 1,
          });
          resolve(r.data);
        }, timeout);
      }).catch((err) => {
        setTimeout(() => {
          setStates({
            ...states,
            loading: false,
            error: err,
            status: 0,
          });
          reject(err);
        }, timeout);
      });
    });
  }

  return {
    callApi,
    loading: states.loading,
    status: states.status,
    prevStatus,
    response: states.response,
    error: states.error
  }
};
