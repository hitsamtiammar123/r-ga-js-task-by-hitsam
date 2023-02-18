import React, {useState} from 'react';
import {MapView} from '@deck.gl/core';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import DUMMY_DATA from './dummy_data.json';
import DateTimePicker from './components/DateTimePicker';
import styles from './App.module.scss';

const INITIAL_VIEW_STATE = {
  longitude: 103.703010666667,
  latitude: 1.3374685,
  zoom: 14,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const MAP_VIEW = new MapView({
  farZMultiplier: 100
});

function App() {

  const [currentDate, setCurrentDate] = useState(null);

  function getTooltip({object}) {
    return (
      object &&
      `\
      Longitude: ${object[0]}
      Latitude: ${object[1]}
      `
    );
  }


  const layers = [
    new ScatterplotLayer({
      id: 'taxy',
      data: DUMMY_DATA.features[0].geometry.coordinates,
      opacity: 0.4,
      radiusScale: 2,
      radiusMinPixels: 1,
      wrapLongitude: true,

      getPosition: d => [d[0], d[1]],
      getRadius: () => 20,
      getFillColor: () => {
        return [160, 160, 160];
      },

      pickable: true
    })
  ]

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
        <DateTimePicker value={currentDate} onChange={setCurrentDate} />
      </div>
    </div>
  );
}

export default App;
