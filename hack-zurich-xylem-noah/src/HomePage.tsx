import React from "react";
import * as SR from "semantic-ui-react";
import * as RD from "react-router-dom";

interface HomePageProps {
  loading: boolean;
  userFeature: any;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  const userColor =
    props.userFeature == null ? "green" : props.userFeature.attributes["name"];

  return (
    <SR.Container fluid>
      <h2 style={{ textAlign: "center" }}>Noah</h2>
      <SR.Segment
        inverted
        loading={props.loading}
        color="yellow"
        style={{ height: "320px" }}
      >
        <h3 style={{ color: "black" }}>
          Flood Status: continuous rainfall for 6 hours.
        </h3>
      </SR.Segment>

      <SR.Grid fluid>
        <SR.Grid.Row fluid>
          <SR.Grid.Column width={8}>
            <SR.Button fluid as={RD.Link} content="Map" to={"/map"} />
          </SR.Grid.Column>

          <SR.Grid.Column width={8}>
            <SR.Button fluid content="Latest News" />
          </SR.Grid.Column>
        </SR.Grid.Row>
      </SR.Grid>

      <SR.Segment
        inverted
        loading={props.loading}
        color={userColor}
        style={{ height: "320px" }}
      >
        <h3 style={{ color: "white" }}>
          User Status: Please follow this navigation to shelter.
        </h3>
      </SR.Segment>

      <SR.Grid fluid>
        <SR.Grid.Row fluid>
          <SR.Grid.Column width={8}>
            <SR.Button fluid as={RD.Link} content="Check Up" to={"/checkup"} />
          </SR.Grid.Column>

          <SR.Grid.Column width={8}>
            <SR.Button fluid as={RD.Link} content="Recommendation" to={"/recommendation"} />
          </SR.Grid.Column>
        </SR.Grid.Row>

        <SR.Grid.Row>
          <SR.Grid.Column width={16}>
            <SR.Button
              fluid
              content="Navigate to nearest shelter."
              to={"/navigate"}
            />
          </SR.Grid.Column>
        </SR.Grid.Row>
      </SR.Grid>
    </SR.Container>
  );
};
