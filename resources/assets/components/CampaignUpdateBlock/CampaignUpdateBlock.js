import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Markdown from '../Markdown';
import { BlockWrapper } from '../Block';
import Embed from '../Embed';
import Byline from '../Byline';
import './campaign-update.scss';

const CampaignUpdateBlock = (props) => {
  const { title, content = 'Let\'s Do This!', link, additionalContent = null } = props.fields;

  const isTweet = content.length < 144;

  return (
    <BlockWrapper title="Campaign Update" id={props.id}>
      { isTweet ? null : <h2>{title}</h2> }

      <Markdown className={classnames('campaign-update__content', { '-tweet': isTweet })}>
        {content}
      </Markdown>

      { link ? <Embed url={link} /> : null }

      { additionalContent ?
        <Byline
          author={additionalContent.author}
          jobTitle={additionalContent.jobTitle}
          avatar={additionalContent.avatar}
        />
        : null }
    </BlockWrapper>
  );
};

CampaignUpdateBlock.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    additionalContent: PropTypes.shape({
      author: PropTypes.string,
      jobTitle: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default CampaignUpdateBlock;
