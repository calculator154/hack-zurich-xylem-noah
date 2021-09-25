import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import * as route from "@arcgis/core/rest/route";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import esriConfig from "@arcgis/core/config";
// import DirectionsViewModel from "@arcgis/core/widgets/Directions/DirectionsViewModel";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";

export const NavigatePage: React.FC<{}> = () => {
  const mapEl = React.useRef(null);
  const [view2, setView2] = React.useState(null);

  React.useEffect(() => {
    esriConfig.apiKey =
      "AAPKbf906662f3f541699e74af02fc20a277vh1Dfjb5u5kUN-j3HNwgrQGMrEtCsrLJTveSRLp2ITsYDNQ2E5f0dijbWQ01x1tx";

    const map = new WebMap({
      basemap: "arcgis-navigation",
      ground: "world-elevation",
    });

    // Set scene view
    const view = new MapView({
      // An instance of Map or WebScene
      map: map,
      center: [8.515599, 47.389842], // Zurich: 47.3769° N, 8.5417° E
      zoom: 12,
      container: mapEl.current,
    });
    setView2(view);

    // Destructor
    return () => {
      // clean up the map view
      if (!!view) {
        view.destroy();
      }
    };
  }, []);

  //   const showNavigate1 = () => {
  //     console.log(view2)
  //
  //     const directionsViewModel = new DirectionsViewModel({
  //       view: view2
  //     })
  //
  //     directionsViewModel.load().then(() => {
  //       console.log('loaded')
  //
  //       directionsViewModel.stops.removeAll();
  //
  //       var start = new Graphic({
  //         geometry: new Point({
  //           latitude: 47.389842,
  //           longitude: 8.515599
  //         })
  //       })
  //       var stop = new Graphic({
  //         geometry: new Point({
  //           latitude: 47.381027568318174,
  //           longitude: 8.53730827723053
  //         })
  //       })
  //       directionsViewModel.stops.addMany([start, stop]);
  //
  //       // find the 'Walking Time' travel mode of the widget
  //       const walkingTravelMode = directionsViewModel.travelModes.find((mode:any) => mode.name === "Walking Time");
  //       console.log(walkingTravelMode)
  //       if (walkingTravelMode) {
  //         (directionsViewModel as any).selectedTravelMode = walkingTravelMode;
  //       }
  //
  //       directionsViewModel.getDirections().then((routeResult: any) => {
  //         console.log(routeResult)
  //       })
  //     })
  //   }

  const showNavigate = () => {
    var start = new Point({
      latitude: 47.389842,
      longitude: 8.515599,
    });
    var stop = new Point({
      latitude: 47.381027568318174,
      longitude: 8.53730827723053,
    });

    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features: [
          new Graphic({ geometry: start }),
          new Graphic({ geometry: stop }),
        ],
      }),
    });

    const routeUrl =
      "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    route.solve(routeUrl, routeParams).then((data) => {
      (data as any).routeResults.forEach((result: any) => {
        result.route.symbol = {
          type: "simple-line",
          color: [5, 150, 255],
          width: 3,
        };
        view2.graphics.add(result.route);
      });
    });
  };

  return (
    <SR.Container>
      <div style={{ height: 640 }} ref={mapEl} />
      <SR.Button
        content="Navigate to the nearest shelter."
        onClick={() => showNavigate()}
      />
    </SR.Container>
  );
};
