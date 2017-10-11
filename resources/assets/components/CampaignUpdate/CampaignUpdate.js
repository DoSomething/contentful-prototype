import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../Card';
import Embed from '../Embed';
import Byline from '../Byline';
import Markdown from '../Markdown';
import { ShareContainer } from '../Share';

const CampaignUpdate = ({ id, author, content, link, shareLink, bordered }) => {
  const { avatar, jobTitle, name } = author.fields;

  const isTweet = content.length < 144;

  return (
    <Card id={id} className={classnames('rounded', { bordered })} link={shareLink} title="Campaign Update">
      <Markdown className={classnames('padded', { 'font-size-lg': isTweet })}>
        {content}
      </Markdown>

      { link ? <Embed className="padded" url={link} /> : null }

      <footer className="padded clearfix">
        <Byline
          author={name}
          avatar={avatar || undefined}
          jobTitle={jobTitle || undefined}
          className="float-left"
        />
        <ShareContainer
          link={shareLink}
          variant="icon"
          parentSource="campaignUpdate"
          className="float-right clear-none"
        />
      </footer>
    </Card>
  );
};

CampaignUpdate.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }).isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
  shareLink: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
};

CampaignUpdate.defaultProps = {
  link: null,
  bordered: true,
};

export default CampaignUpdate;
