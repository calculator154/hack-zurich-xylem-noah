import React from "react";
import * as SR from "semantic-ui-react";
import * as RD from "react-router-dom";
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';

export const Recommendation: React.FC<{}> = () => {
  return (
    <div className="Recommendation" >
        <LoremIpsum p={2} />
    </div>
  );
};
