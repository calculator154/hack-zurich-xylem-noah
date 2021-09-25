import React from "react";
import * as SR from "semantic-ui-react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import WebScene from "@arcgis/core/WebScene";
import Map from "@arcgis/core/Map";
// import PortalItem from "@arcgis/core/portal/PortalItem";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import esriConfig from "@arcgis/core/config";

// Time - flood level array
const time_floodLevel = [-80, -75, -70, -65, -62, -60, -57, -53, -50, -45, -40, -35];


export const MapPage: React.FC<{}> = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [lastUpdated, setLastUpdated] = React.useState(Date.now());
  const mapEl = React.useRef(null);

  const pointLayerUrl =
    "https://services3.arcgis.com/Xr0XohUodMm3WJYC/arcgis/rest/services/my_points/FeatureServer/0";

  React.useEffect(() => {
    esriConfig.apiKey =
      "AAPKbf906662f3f541699e74af02fc20a277vh1Dfjb5u5kUN-j3HNwgrQGMrEtCsrLJTveSRLp2ITsYDNQ2E5f0dijbWQ01x1tx";

    const map = new WebMap({
      basemap: "topo",
      ground: "world-elevation",
      portalItem: {
        id: "6d5420d3580648c89c9bc3b72f530e5a",
      },
    });

    // Polygon
    const fillSymbol = new PolygonSymbol3D({
      symbolLayers: [
        {
          type: "water",
          waveDirection: 180,
          color: "#5975a3",
          waveStrength: "moderate",
          waterbodySize: "medium",
        },
      ],
    });

    // Polygon location
    const floodLevel = time_floodLevel[sliderValue];
    const rings = [
      [
        [8.615599, 47.289842, floodLevel],
        [8.615599, 47.599842, floodLevel],
        [8.305599, 47.599842, floodLevel],
        [8.305599, 47.289842, floodLevel],
        [8.615599, 47.289842, floodLevel],
      ],
    ];
    const polygon = new Polygon({
      hasZ: true,
      hasM: false,
      rings: rings,
      spatialReference: { wkid: 4326 },
    });

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol,
    });

    // Graphic Layer
    const graphicsLayer = new GraphicsLayer({
      elevationInfo: {
        mode: "relative-to-scene",
      },
    });
    graphicsLayer.add(polygonGraphic);
    map.add(graphicsLayer);

    // Set scene view
    const view = new SceneView({
      // An instance of Map or WebScene
      map: map,
      center: [8.530599, 47.382842], // Zurich: 47.3769° N, 8.5417° E
      zoom: 14,
      container: mapEl.current,
    });

    // For debug
    //(window as any)["view"] = view;

    // Destructor
    return () => {
      // clean up the map view
      if (!!view) {
        view.destroy();
      }
    };
  }, [lastUpdated, sliderValue]);

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
        min={0}
        max={time_floodLevel.length - 1}
        type="range"
        value={sliderValue}
        onChange={(_, { value }) => setSliderValue(parseInt(value))}
      />
    </SR.Container>
  );
};
