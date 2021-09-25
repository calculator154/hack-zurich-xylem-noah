import React from "react";
import * as SR from "semantic-ui-react";
import * as RD from "react-router-dom";

export const HomePage: React.FC<{}> = () => {
  return (
    <SR.Container fluid>
      <SR.Segment inverted color="yellow" style={{ height: "320px" }}>
        Flood Status: continuous rainfall for 6 hours.
      </SR.Segment>

      <SR.Button as={RD.Link} content="Map" to={"/map"} />

      <SR.Segment inverted color="red" style={{ height: "320px" }}>
        User Status: Need Shelter
      </SR.Segment>

      <SR.Grid fluid>
        <SR.Grid.Row fluid>
          <SR.Grid.Column width={8}>
            <SR.Button fluid as={RD.Link} content="Check Up" to={"/checkup"} />
          </SR.Grid.Column>

          <SR.Grid.Column width={8}>
            <SR.Button fluid content="Recommendation" />
          </SR.Grid.Column>
        </SR.Grid.Row>
      </SR.Grid>
    </SR.Container>
  );
};
