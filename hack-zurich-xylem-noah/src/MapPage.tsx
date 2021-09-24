import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
// import Map from "@arcgis/core/Map";


export const MapPage: React.FC<{}> = () => {
  const mapEl = React.useRef(null);

  React.useEffect(() =>  {

    const map = new EsriMap({
      basemap: "streets-vector",
    });

    let view = new MapView({
      map: map,
      center: [-118.244, 34.052],
      zoom: 12,
      container: mapEl.current
    })

    return () => {
      // clean up the map view
      if (!!view) {
        view.destroy();
      }
    };
  })

  return <div style={{ height: 400 }} ref={mapEl} />;
}