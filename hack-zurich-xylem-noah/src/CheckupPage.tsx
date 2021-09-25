import React from "react";
import * as SR from "semantic-ui-react";

export const CheckupPage: React.FC<{}> = () => {
  const [healthChoice, setHealthChoice] = React.useState(0);
  const [rationChoice, setRationChoice] = React.useState(0);
  const [locationChoice, setLocationChoice] = React.useState(0);

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
              value={1}
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
              checked={locationChoice == 0}
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

      <SR.Button fluid content="Update my Check Up" />
    </SR.Container>
  );
};
