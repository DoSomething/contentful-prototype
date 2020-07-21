import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propType } from 'graphql-anywhere';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Byline from '../../utilities/Byline/Byline';
import { contentfulImageUrl } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';

export const CampaignUpdateBlockFragment = gql`
  fragment CampaignUpdateBlockFragment on CampaignUpdateBlock {
    id
    content
    link
    author {
      name
      jobTitle
      photo {
        url
      }
    }
    affiliateLogo {
      url
    }
  }
`;

const CampaignUpdate = props => {
  const {
    affiliateLogo,
    author,
    id,
    closeModal,
    content,
    link,
    bordered,
  } = props;

  const authorPhoto = get(author, 'photo.url') || undefined;

  const isTweet = content && content.length < 144;

  return (
    <Card
      id={id}
      className={classnames('rounded', { bordered })}
      title="Campaign Update"
      onClose={closeModal}
    >
      <TextContent className={classnames('p-3', { 'text-xl': isTweet })}>
        {content || 'Placeholder'}
      </TextContent>

      {link ? (
        <div className="p-3">
          <Embed url={link} />
        </div>
      ) : null}

      <footer className="p-3 clearfix">
        {affiliateLogo ? (
          <AffiliatePromotion
            imgUrl={affiliateLogo}
            textClassName="text-gray-600"
          />
        ) : (
          <Byline
            author={author.name}
            photo={contentfulImageUrl(authorPhoto, 175, 175, 'fill')}
            jobTitle={author.jobTitle || undefined}
            className="float-left"
          />
        )}
      </footer>
    </Card>
  );
};

CampaignUpdate.propTypes = {
  ...propType(CampaignUpdateBlockFragment).isRequired,
  bordered: PropTypes.bool,
  closeModal: PropTypes.func,
};

CampaignUpdate.defaultProps = {
  bordered: true,
  closeModal: () => {},
};

export default CampaignUpdate;
