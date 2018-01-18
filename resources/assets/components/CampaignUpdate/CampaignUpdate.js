import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import Card from '../Card';
import Embed from '../Embed';
import Byline from '../Byline';
import Markdown from '../Markdown';
import { ShareContainer } from '../Share';

const CampaignUpdate = (props) => {
  const {
    author, id, closeModal, content,
    link, shareLink, bordered, titleLink,
  } = props;

  const authorFields = get(author, 'fields', {});

  const isTweet = content && content.length < 144;

  return (
    <Card id={id} className={classnames('rounded', { bordered })} link={titleLink} title="Campaign Update" onClose={closeModal}>
      <Markdown className={classnames('padded', { 'font-size-lg': isTweet })}>
        {content || 'Placeholder'}
      </Markdown>

      { link ? <Embed className="padded" url={link} /> : null }

      <footer className="padded clearfix">
        <Byline
          author={authorFields.name}
          avatar={authorFields.avatar || undefined}
          jobTitle={authorFields.jobTitle || undefined}
          className="float-left"
        />
        <ShareContainer
          link={shareLink}
          variant="icon"
          parentSource="campaignUpdate"
          className="clear-none -right-icon"
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
  }),
  closeModal: PropTypes.func,
  content: PropTypes.string,
  link: PropTypes.string,
  shareLink: PropTypes.string.isRequired,
  titleLink: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
};

CampaignUpdate.defaultProps = {
  link: null,
  bordered: true,
  author: null,
  content: null,
  closeModal: null,
};

export default CampaignUpdate;
