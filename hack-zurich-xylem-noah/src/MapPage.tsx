import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import WebScene from "@arcgis/core/WebScene";
// import Map from "@arcgis/core/Map";
// import PortalItem from "@arcgis/core/portal/PortalItem";
import SceneView from "@arcgis/core/views/SceneView";


export const MapPage: React.FC<{}> = () => {
  const mapEl = React.useRef(null);

  React.useEffect(() =>  {

//     const map = new EsriMap({
//       basemap: "streets-vector",
//     });

    const map = new WebMap({
//       basemap: "streets-vector",
      portalItem: {
        id: "9828dc09e28445c283f694fb60b7a99f"
      }
    });


    const scene = new WebScene({
//       basemap: "streets-vector",
      portalItem: {
        id: "9828dc09e28445c283f694fb60b7a99f"
      }
    });

//     let view = new MapView({
//       map: map,
// //       center: [-118.244, 34.052],
// //       zoom: 12,
// //       container: mapEl.current
//     })

    let view = new SceneView({
      map: scene,
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