import React from "react";
import * as SR from "semantic-ui-react";
import * as RD from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { HomePage } from "./HomePage";
import { CheckupPage } from "./CheckupPage";
import { MapPage } from "./MapPage";
import { Recommendation } from "./Recommendation";
import { NavigatePage } from "./NavigatePage";

function App() {
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
            <CheckupPage />
          </RD.Route>
          <RD.Route path="/navigate">
            <NavigatePage />
          </RD.Route>
          <RD.Route exact path="/">
            <HomePage />
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
