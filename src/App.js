import React, { useState, useEffect } from 'react';
import { MapView } from '@deck.gl/core';
import { StaticMap } from 'react-map-gl';
import moment from 'moment';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import DateTimePicker from './components/DateTimePicker';
import styles from './App.module.scss';
import { useAxios } from './hooks';

const INITIAL_VIEW_STATE = {
  longitude: 103.703010666667,
  latitude: 1.3374685,
  zoom: 14,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const MAP_VIEW = new MapView({
  farZMultiplier: 100,
});

const CURRENT_DATE = moment();

function App() {
  const [currentDate, setCurrentDate] = useState(null);
  const [data, setData] = useState(null);
  const [extraData, setExtraData] = useState({
    total: 0,
    timestamp: null,
  });

  const api = useAxios('https://api.data.gov.sg/v1/transport/taxi-availability', 'get');

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  useEffect(() => {
    if (api.prevStatus !== undefined && api.prevStatus !== api.status) {
      switch (api.status) {
        case 1:
          onDataLoadSuccess();
          break;
        case 0:
          onDataLoadFailed();
          break;
        default:
      }
    }
  }, [api.status, api.prevStatus]);

  function onDataLoadFailed() {
    alert('An error occured when load data, please try again');
  }

  function onDataLoadSuccess() {
    if (!api.response.features) {
      setData([]);
      setExtraData({
        total: 0,
        timestamp: currentDate.format('YYYY-MM-DD hh:mm:ss a'),
      });
      return;
    }
    const feature = api.response.features[0];
    setData(feature.geometry.coordinates);
    setExtraData({
      total: feature.properties.taxi_count,
      timestamp: moment(feature.properties.timestamp).format('YYYY-MM-DD hh:mm:ss a'),
    });
  }

  function fetchData() {
    const request = {};
    if (currentDate) {
      request.date_time = currentDate.format('YYYY-MM-DDTHH:mm:ss');
    }
    api.callApi(request);
  }

  function getTooltip({ object }) {
    return (
      object &&
      `\
      Longitude: ${object[0]}
      Latitude: ${object[1]}
      `
    );
  }

  const layers = [
    data &&
      new ScatterplotLayer({
        id: 'taxy',
        data: data,
        opacity: 0.4,
        radiusScale: 2,
        radiusMinPixels: 1,
        wrapLongitude: true,

        getPosition: (d) => [d[0], d[1]],
        getRadius: () => 20,
        getFillColor: () => {
          return [160, 160, 160];
        },

        pickable: true,
      }),
  ];

  return (
    <div className={styles.App}>
      <DeckGL
        views={MAP_VIEW}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        getTooltip={getTooltip}
        layers={layers}
      >
        <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing />
      </DeckGL>
      <div className={styles.datepickerContainer}>
        <Grid container direction="column" width="300px">
          <DateTimePicker
            minutesStep={60}
            maxDate={CURRENT_DATE}
            value={currentDate}
            onAccept={setCurrentDate}
          />
          <span>Total Taxi: {extraData.total}</span>
          <span>Timestamp: {extraData.timestamp}</span>
        </Grid>
      </div>
      <Backdrop sx={{ color: 'rgb(160,160,160)' }} open={api.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
