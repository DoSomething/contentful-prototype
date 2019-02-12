import React from 'react';
import PropTypes from 'prop-types';

import { Flex, FlexCell } from '../Flex';
import Card from '../utilities/Card/Card';
import Share from '../utilities/Share/Share';
import Byline from '../utilities/Byline/Byline';
import TextContent from '../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../helpers';

import './affirmation.scss';

// @TODO: Refactor/redesign.
// We seem to have removed the content "photo" from being used in the actual output.
// Also it would be nice to be able to default to the Campaign Lead attached to the
// campaign if no author is provided!
const Affirmation = ({
  author,
  callToActionDescription,
  callToActionHeader,
  header,
  quote,
}) => (
  <Card className="affirmation rounded" title={header}>
    {quote ? (
      <TextContent className="padding-top-md padding-horizontal-md">
        {quote}
      </TextContent>
    ) : null}

    <Flex className="flex-align-center">
      <FlexCell className="affirmation__cta padded" width="half">
        <h3>{callToActionHeader}</h3>
        <p>{callToActionDescription}</p>
      </FlexCell>
      <FlexCell className="padded" width="half">
        <Share variant="blue" parentSource="affirmation" />
      </FlexCell>
    </Flex>

    {author ? (
      <Byline
        author={author.fields.name}
        {...withoutNulls(author.fields)}
        photo={contentfulImageUrl(author.fields.photo, 175, 175, 'fill')}
        className="padding-bottom-md padding-horizontal-md"
      />
    ) : null}
  </Card>
);

Affirmation.propTypes = {
  author: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  callToActionDescription: PropTypes.string,
  callToActionHeader: PropTypes.string,
  header: PropTypes.string,
  quote: PropTypes.string,
};

Affirmation.defaultProps = {
  author: null,
  callToActionDescription:
    "By joining this campaign, you've teamed up with millions of other members who are making an impact on the causes affecting your world. As a DoSomething.org member, you're part of something bigger. You're part of a global movement for good.",
  callToActionHeader: "Woohoo! You're signed up.",
  header: 'Thanks for joining us!',
  quote: null,
};

export default Affirmation;
