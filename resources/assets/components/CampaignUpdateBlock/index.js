import React from 'react';
import classnames from 'classnames';
import Markdown from '../Markdown';
import Block, { BlockTitle } from '../Block';
import { Figure } from '../Figure';
import Embed from '../Embed';
import DEFAULT_AVATAR from './default-avatar.png';
import './campaign-update.scss';

const Byline = ({ author, jobTitle, avatar }) => (
  <Figure size="small" alignment="left" verticalAlignment="center" image={avatar} imageClassName="avatar">
    <strong>{author}</strong><br />
    <p className="footnote">{jobTitle}</p>
  </Figure>
);

Byline.propTypes = {
  author: React.PropTypes.string.isRequired,
  jobTitle: React.PropTypes.string,
  avatar: React.PropTypes.string,
};

Byline.defaultProps = {
  jobTitle: 'DoSomething.org Staff',
  avatar: DEFAULT_AVATAR,
};

const CampaignUpdateBlock = (props) => {
  const { title, content, link, additionalContent } = props.fields;
  const { author, jobTitle, avatar } = additionalContent;

  const isTweet = content.length < 144;

  return (
    <Block>
      <BlockTitle>Campaign Update</BlockTitle>
      { isTweet ? null : <h2>{title}</h2> }
      <Markdown className={classnames('campaign-update__content', { '-tweet': isTweet })}>
        {content}
      </Markdown>
      { link ? <Embed url={link} /> : null }
      { author ? <Byline author={author} jobTitle={jobTitle} avatar={avatar} /> : null}
    </Block>
  );
};

CampaignUpdateBlock.propTypes = {
  fields: React.PropTypes.shape({
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    additionalContent: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      jobTitle: React.PropTypes.string,
      avatar: React.PropTypes.string,
    }),
  }).isRequired,
};

export default CampaignUpdateBlock;
