import React from 'react';
import {MapView} from '@deck.gl/core';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import styles from './App.module.scss';

const INITIAL_VIEW_STATE = {
  longitude: 103.703010666667,
  latitude: 1.3374685,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const MAP_VIEW = new MapView({
  farZMultiplier: 100
});

function App() {
  return (
    <div className={styles.App}>
      <DeckGL
        views={MAP_VIEW}
        initialViewState={INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing />
      </DeckGL>
    </div>
  );
}

export default App;
