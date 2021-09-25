import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import WebScene from "@arcgis/core/WebScene";
// import Map from "@arcgis/core/Map";
// import PortalItem from "@arcgis/core/portal/PortalItem";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"


export const MapPage: React.FC<{}> = () => {
  const mapEl = React.useRef(null);

  React.useEffect(() =>  {

    const map = new EsriMap({
      basemap: "streets-vector",
    });

    const pointsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/Xr0XohUodMm3WJYC/arcgis/rest/services/my_points/FeatureServer/0"
    });
    map.add(pointsLayer)

    let view = new MapView({
      map: map,
      center: [8.515599, 47.389842],  // Zurich: 47.3769° N, 8.5417° E
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

  return (
    <SR.Container>
      <div style={{ height: 640 }} ref={mapEl} />;
      <div>TODO: some widget here</div>
    </SR.Container>
  )
}