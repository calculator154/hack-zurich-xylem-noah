import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config";

export const MapPage: React.FC<{}> = () => {
  const [sliderValue, setSliderValue] = React.useState(1)
  const [lastUpdated, setLastUpdated] = React.useState(Date.now());
  const mapEl = React.useRef(null);

  const pointLayerUrl =
    "https://services3.arcgis.com/Xr0XohUodMm3WJYC/arcgis/rest/services/my_points/FeatureServer/0";

  React.useEffect(() => {
    esriConfig.apiKey =
      "AAPKbf906662f3f541699e74af02fc20a277vh1Dfjb5u5kUN-j3HNwgrQGMrEtCsrLJTveSRLp2ITsYDNQ2E5f0dijbWQ01x1tx";

    //     const map = new EsriMap({
    //       basemap: "streets-vector",
    //     });

    const map = new WebMap({
      basemap: "streets-vector",
      portalItem: {
        id: "6d5420d3580648c89c9bc3b72f530e5a",
      },
    });

    let view = new MapView({
      map: map,
      center: [8.515599, 47.389842], // Zurich: 47.3769° N, 8.5417° E
      zoom: 12,
      container: mapEl.current,
    });

    return () => {
      // clean up the map view
      if (!!view) {
        view.destroy();
      }
    };
  }, [lastUpdated]);

  // Dummy button that cycles the color at fixed ID (at Technopark).
  const onClick = () => {
    const pointsLayer = new FeatureLayer({ url: pointLayerUrl });
    pointsLayer
      .queryFeatures({
        where: "id = 12345678",
        outFields: ["*"],
      })
      .then((response) => {
        if (response.features.length > 0) {
          const editFeature = response.features[0];
          console.log(editFeature);

          // Swap between green -> yellow -> red.
          switch (editFeature.attributes["name"]) {
            case "green":
              editFeature.attributes["name"] = "yellow";
              break;
            case "yellow":
              editFeature.attributes["name"] = "red";
              break;
            case "red":
              editFeature.attributes["name"] = "green";
              break;
          }

          // Submit the change to the cloud.
          pointsLayer
            .applyEdits({ updateFeatures: [editFeature] })
            .then((response) => {
              console.log(response);
              // Trigger reload on useEffect.
              setLastUpdated(Date.now());
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SR.Container>
      <div style={{ height: 480 }} ref={mapEl} />;
      <div>TODO: some widget here</div>
      <SR.Button content="Change My Color" onClick={onClick} />

      {`Time ${sliderValue}`}
      <SR.Input
        min={1}
        max={9}
        type='range'
        value={sliderValue}
        onChange={(_, {value}) => setSliderValue(parseInt(value))}
      />
    </SR.Container>
  );
};
