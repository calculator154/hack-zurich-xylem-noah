import React from "react";
import * as SR from "semantic-ui-react";
import * as RD from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { HomePage } from "./HomePage";
import { CheckupPage } from "./CheckupPage";
import { MapPage } from "./MapPage";
import { Recommendation } from "./Recommendation";
import { NavigatePage } from "./NavigatePage";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import esriConfig from "@arcgis/core/config";
esriConfig.apiKey =
  "AAPKbf906662f3f541699e74af02fc20a277vh1Dfjb5u5kUN-j3HNwgrQGMrEtCsrLJTveSRLp2ITsYDNQ2E5f0dijbWQ01x1tx";

const pointLayerUrl =
  "https://services3.arcgis.com/Xr0XohUodMm3WJYC/arcgis/rest/services/my_points/FeatureServer/0";

const pointsLayer = new FeatureLayer({ url: pointLayerUrl });

function App() {
  const [loading, setLoading] = React.useState(false);
  const [userFeature, setUserFeature] = React.useState(null);

  // Retrieve user color status from the dummy point at ID == 12345678.
  React.useEffect(() => {
    setLoading(true);
    pointsLayer
      .queryFeatures({
        where: "id = 12345678",
        outFields: ["*"],
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.features.length > 0) {
          const editFeature = response.features[0];
          setUserFeature(editFeature);
          //           setUserColor(editFeature.attributes["name"])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <SR.Container fluid style={{
        backgroundImage: `url(bg.jpg)`,
        width:'375px' ,
        height:'812px'
        }}>
      <RD.BrowserRouter>
        <RD.Switch>
          <RD.Route path="/recommendation">
            <Recommendation />
          </RD.Route>
          <RD.Route path="/map">
            <MapPage />
          </RD.Route>
          <RD.Route path="/checkup">
            <CheckupPage userFeature={userFeature} pointsLayer={pointsLayer} />
          </RD.Route>
          <RD.Route path="/navigate">
            <NavigatePage />
          </RD.Route>
          <RD.Route exact path="/">
            <HomePage loading={loading} userFeature={userFeature} />
          </RD.Route>
          <SR.Container fluid textAlign="center">
            PAGE NOT FOUND
          </SR.Container>
        </RD.Switch>
      </RD.BrowserRouter>
    </SR.Container>
  );
}

export default App;
