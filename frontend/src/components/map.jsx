import React, { useEffect, useState } from 'react';
import { MapContainer, LayersControl, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map-styles.css';

export default function CustomLayersMap() {
  const [layer1Data, setLayer1Data] = useState(null);
  const [layer2Data, setLayer2Data] = useState(null);
  const [layer3Data, setLayer3Data] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('../data/layer1.geojson').then(res => res.json()),
      fetch('../data/layer2.geojson').then(res => res.json()),
      fetch('../data/layer3.geojson').then(res => res.json())
    ])
    .then(([data1, data2, data3]) => {
      setLayer1Data(data1);
      setLayer2Data(data2);
      setLayer3Data(data3);
    })
    .catch(err => console.error("Error loading layers:", err));
  }, []);

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const labelText = feature.properties.NAME_3 || feature.properties.NAME_2 || feature.properties.NAME_1;

      if (labelText) {
        layer.bindTooltip(labelText, {
          permanent: true,
          direction: 'center',
          className: 'region-label'
        });
      }
    }
  }

  return (
    <div className='mapSection'> 

      
      <MapContainer 
        center={[9.145, 40.4896]} 
        zoom={6}
        className='mapContainer'
      >
        <LayersControl position="topright">
          
          {layer1Data && (
            <LayersControl.Overlay checked name="Layer 1">
              <GeoJSON 
                key={`layer1-${layer1Data.features.length}`}
                data={layer1Data} 
                className='mapLayer' 
                onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {layer2Data && (
            <LayersControl.Overlay checked name="Layer 2">
              <GeoJSON 
                data={layer2Data} 
                className='mapLayer' 
                onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {layer3Data && (
            <LayersControl.Overlay checked name="Layer 3">
              <GeoJSON 
                data={layer3Data} 
                className='mapLayer'
                //onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>
          )}

        </LayersControl>
      </MapContainer>
    </div>
  );
}


