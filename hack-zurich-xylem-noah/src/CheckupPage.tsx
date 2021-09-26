import React from "react";
import * as SR from "semantic-ui-react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface HomePageProps {
  userFeature: any;
  pointsLayer: FeatureLayer;
}

export const CheckupPage: React.FC<HomePageProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [healthChoice, setHealthChoice] = React.useState(0);
  const [rationChoice, setRationChoice] = React.useState(0);
  const [locationChoice, setLocationChoice] = React.useState(0);

  // Here, it should do the logic to classify the user's status
  // into 3 categories: green/yellow/red. It should also update
  // user's input in order to have an aggregate map of the inputs.
  // For example, we'd be able to see all users that reports being
  // injured, so that the medical rescue can know where.
  const onSubmit = () => {
    setLoading(true);
    // In this mockup, green when every answer is positive.
    // Yellow when one answer is negative, otherwise red.
    switch (healthChoice + rationChoice + locationChoice) {
      case 0:
        props.userFeature.attributes["name"] = "green";
        break;
      case 1:
        props.userFeature.attributes["name"] = "yellow";
        break;
      default:
        props.userFeature.attributes["name"] = "red";
        break;
    }

    // Submit the change to the cloud.
    props.pointsLayer
      .applyEdits({ updateFeatures: [props.userFeature] })
      .then((response: any) => {
        console.log(response);
        setLoading(false);
        window.location.href = "/";
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <SR.Container>
      <SR.Segment>
        <SR.Form>
          <h3>How is your health condition?</h3>
          <SR.Form.Field>
            <SR.Radio
              label={"I'm in good heath, with no/negligible injury."}
              name="radioGroup"
              value={0}
              checked={healthChoice === 0}
              onChange={(_, { value }) => setHealthChoice(value as number)}
            />
          </SR.Form.Field>
          <SR.Form.Field>
            <SR.Radio
              label={"I need medical assistance."}
              name="radioGroup"
              value={1}
              checked={healthChoice === 1}
              onChange={(_, { value }) => setHealthChoice(value as number)}
            />
          </SR.Form.Field>
        </SR.Form>
      </SR.Segment>

      <SR.Segment>
        <SR.Form>
          <h3>{"Do you have access to food & fresh water?"}</h3>
          <SR.Form.Field>
            <SR.Radio
              label={
                "I've access to food and water up to the foreseeable future."
              }
              name="radioGroup"
              value={0}
              checked={rationChoice === 0}
              onChange={(_, { value }) => setRationChoice(value as number)}
            />
          </SR.Form.Field>
          <SR.Form.Field>
            <SR.Radio
              label={
                "I've some access to food/water, but for less than 2-3 days."
              }
              name="radioGroup"
              value={1}
              checked={rationChoice === 1}
              onChange={(_, { value }) => setRationChoice(value as number)}
            />
          </SR.Form.Field>

          <SR.Form.Field>
            <SR.Radio
              label={"I'm hungry!"}
              name="radioGroup"
              value={2}
              checked={rationChoice === 2}
              onChange={(_, { value }) => setRationChoice(value as number)}
            />
          </SR.Form.Field>
        </SR.Form>
      </SR.Segment>

      <SR.Segment>
        <SR.Form>
          <h3>{"Where are you?"}</h3>
          <SR.Form.Field>
            <SR.Radio
              label={"I'm in my private residence."}
              name="radioGroup"
              value={0}
              checked={locationChoice === 0}
              onChange={(_, { value }) => setLocationChoice(value as number)}
            />
          </SR.Form.Field>
          <SR.Form.Field>
            <SR.Radio
              label={"I'm at communal shelter."}
              name="radioGroup"
              value={1}
              checked={locationChoice === 1}
              onChange={(_, { value }) => setLocationChoice(value as number)}
            />
          </SR.Form.Field>
        </SR.Form>
      </SR.Segment>

      {"etc.!"}

      <SR.Button
        fluid
        content="Update my Check Up"
        loading={loading}
        onClick={() => onSubmit()}
      />
    </SR.Container>
  );
};
